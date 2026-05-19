import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { notification } from "antd";
import {
  getAccessToken,
  getRefreshToken,
  removeApiTokens,
  updateAccessToken,
  updateRefreshToken,
} from "@/common/utils/api";
import merge from "deepmerge";
import isEqual from "lodash.isequal";
import { ErrorLink } from "@apollo/client/link/error";
import {
  RefreshAccessTokenMutation,
  RefreshAccessTokenMutationVariables,
} from "@/generated/graphql";
import {
  GRAPHQL_URL,
  NO_TOKEN_OPERATIONS,
  TOKEN_EXPIRED_SUB_CODES,
} from "./apollo.constants";
import { REFRESH_TOKEN_MUTATION } from "@/common/graphql/auth";

const apiLink = new HttpLink({
  uri: GRAPHQL_URL,
});

let client: ApolloClient;

let isRefreshingToken = false;
const ignoreErrorsForOperations: string[] = [];

function authMiddleware() {
  return new ApolloLink((operation, forward) => {
    const token = getAccessToken();

    const skipTokenHeaders = NO_TOKEN_OPERATIONS.includes(
      operation.operationName || ""
    );

    const shouldAuthenticate = token && !skipTokenHeaders;

    if (shouldAuthenticate) {
      operation.setContext((context: { headers: object }) => ({
        headers: {
          authorization: token,
          ...context.headers,
        },
      }));
    }

    return forward(operation);
  });
}

async function refreshTokens() {
  if (!client) {
    return;
  }

  const variables: RefreshAccessTokenMutationVariables = {
    refreshTokenInput: {
      refreshToken: getRefreshToken(),
    },
  };
  return await client.mutate<
    RefreshAccessTokenMutation,
    RefreshAccessTokenMutationVariables
  >({
    mutation: REFRESH_TOKEN_MUTATION,
    variables,
  });
}

const errorHandler: ErrorLink.ErrorHandler = ({ error }): void => {
  const isClientSide = typeof window !== "undefined";

  if (!isClientSide || isRefreshingToken) {
    return;
  }

  const subCodes: (string | undefined)[] = [];
  const errorMessages: string[] = [];

  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach((err) => {
      subCodes.push(err.extensions?.sub_code as string | undefined);
 
      const ignoreError = ignoreErrorsForOperations.some((op) =>
        err.path?.includes(op)
      );
 
      if (err.message && !ignoreError) {
        errorMessages.push(err.message);
      }
    });
  } else {
    // Network or other error
    const typedError = error as {
      result?: { sub_code?: string };
      message?: string;
    };
    const subCode = typedError?.result?.sub_code;
    if (subCode) {
      subCodes.push(subCode);
    }
    if (typedError?.message) {
      errorMessages.push(typedError.message);
    }
  }

  const hasInvalidTokenSubCode = subCodes.some(
    (code) => code && TOKEN_EXPIRED_SUB_CODES.includes(code)
  );

  if (!hasInvalidTokenSubCode) {
    if (errorMessages.length) {
      notification.error({
        message: (
          <ul className="list-disc ml-4 space-y-2">
            {errorMessages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        ),
        placement: "top",
      });
    }
    return;
  }

  isRefreshingToken = true;

  refreshTokens()
    .then((response) => {
      if (!response) {
        throw new Error("Failed to refresh tokens");
      }

      const newTokens = response.data?.refreshAccessToken;
      if (newTokens) {
        const { accessToken, refreshToken } = newTokens;
        updateAccessToken(accessToken);
        updateRefreshToken(refreshToken ?? "");
      } else {
        throw new Error("Failed to refresh tokens");
      }
    })
    .catch(() => {
      removeApiTokens();
    })
    .finally(() => {
      if (window) {
        window.location.reload();
      }
    });
};

const errorLink = new ErrorLink(errorHandler);

const createApolloClient = () => {
  return new ApolloClient({
    link: ApolloLink.from([errorLink, authMiddleware(), apiLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      mutate: {
        errorPolicy: "all",
      },
    },
  });
};

export function initializeApollo(
  initialState: undefined | null | object = null
) {
  const _apolloClient = client ?? createApolloClient();
  // If your page has Next.js data fetching methods that use Apollo Client,
  //  the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps
    // in the existing cache
    const data: object | null | undefined = merge(existingCache as object, initialState as object, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });
    // Restore the cache with the merged data
    if (data) {
      _apolloClient.cache.restore(data);
    }
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!client) client = _apolloClient;
  return _apolloClient;
}
