import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client/react";
import { AuthStatesEnum } from "./useAuth";

const GET_CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      email
      firstName
      fullName
      id
      lastName
    }
  }
`;

type useCurrentUserProps = {
  authState: AuthStatesEnum;
};

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
}

interface CurrentUserData {
  currentUser?: User;
}

const useCurrentUser = (props: useCurrentUserProps) => {
  const { authState } = props;
  const { data, ...rest } = useQuery(GET_CURRENT_USER, {
    skip: authState !== AuthStatesEnum.loggedIn,
    fetchPolicy: "cache-and-network",
  });

  const currentUser = (data as CurrentUserData | undefined)?.currentUser;

  if (authState === AuthStatesEnum.loggedOut) {
    return null;
  }

  return {
    data: currentUser,
    ...rest,
  };
}

export default useCurrentUser;
