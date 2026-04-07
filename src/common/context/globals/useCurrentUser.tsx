import { gql, useQuery } from "@apollo/client";
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

const useCurrentUser = (props: useCurrentUserProps) => {
  const { authState } = props;
  const { data, ...rest } = useQuery(GET_CURRENT_USER, {
    skip: authState !== AuthStatesEnum.loggedIn,
    fetchPolicy: "cache-and-network",
  });

  const currentUser = data?.currentUser;

  if (authState === AuthStatesEnum.loggedOut) {
    return null;
  }

  return {
    data: currentUser,
    ...rest,
  };
}

export default useCurrentUser;
