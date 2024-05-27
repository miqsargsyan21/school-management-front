import { gql } from "@apollo/client";

export const getTeachersPageData = gql`
  query GetTeachersPageData {
    teachers {
      id
      firstName
      lastName
    }
    subjects {
      id
      title
    }
  }
`;
