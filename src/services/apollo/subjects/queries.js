import { gql } from "@apollo/client";

export const getSubjectsPageData = gql`
  query GetSubjectsPageData {
    subjects {
      id
      title
    }
  }
`;
