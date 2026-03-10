import { gql, useQuery } from "@apollo/client";
import { AuthStatesEnum } from "./useAuth";

export enum UserType {
  CONSUMER = "CONSUMER",
  GENERATOR = "GENERATOR",
}

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

  const userType = currentUser?.generator?.id 
    ? UserType.GENERATOR 
    : currentUser?.consumer?.id 
    ? UserType.CONSUMER 
    : null;

  return {
    data: currentUser,
    userType,
    ...rest,
  };
}

export default useCurrentUser;
