import { gql } from "@apollo/client";

export const getPupilsPageData = gql`
  query GetPupilsPageData {
    pupils {
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
