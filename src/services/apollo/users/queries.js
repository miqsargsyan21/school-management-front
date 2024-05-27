import { gql } from "@apollo/client";

export const signInQuery = gql`
  query signIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      token
    }
  }
`;

export const getUser = gql`
  query GetUser($token: String!) {
    user(token: $token) {
      firstName
      lastName
    }
  }
`;
