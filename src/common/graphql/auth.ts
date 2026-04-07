import { gql } from "@apollo/client";

// It is the most common auth mutations, update/remove it depending on the project.

export const LOGIN = gql`
  mutation Login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      accessToken
      refreshToken
    }
  }
`;

export const REQUEST_OTP = gql`
  mutation RequestOtp($input: RequestOtpInput!) {
    requestOtp(input: $input)
  }
`;

export const VERIFY_OTP = gql`
  mutation VerifyOtp($input: VerifyOtpInput!) {
    verifyOtp(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

export const SIGNUP = gql`
  mutation SignUp($userInput: SignUpInput!) {
    signUp(input: $userInput) {
      accessToken
      refreshToken
    }
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshAccessToken($refreshTokenInput: RefreshAccessTokenInput!) {
    refreshAccessToken(input: $refreshTokenInput) {
      accessToken
      refreshToken
    }
  }
`;
