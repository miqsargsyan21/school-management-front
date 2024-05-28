import { gql } from "@apollo/client";

export const getPupilsPageData = gql`
  query GetPupilsPageData {
    pupils {
      id
      firstName
      lastName
      subjects {
        subject {
          id
          title
        }
      }
    }
    subjects {
      id
      title
    }
  }
`;

export const createPupilQuery = gql`
  mutation createPupil(
    $firstName: String!
    $lastName: String!
    $subjectIds: [Int]!
  ) {
    createPupil(
      input: {
        firstName: $firstName
        lastName: $lastName
        subjectIds: $subjectIds
      }
    ) {
      firstName
      lastName
      id
    }
  }
`;

export const deletePupilQuery = gql`
  mutation deletePupil($id: ID!) {
    deletePupil(id: $id) {
      id
    }
  }
`;
