import { gql } from "@apollo/client";

export const getTeachersPageData = gql`
  query GetTeachersPageData {
    teachers {
      id
      firstName
      lastName
      subjects {
        id
        title
      }
    }
    subjects {
      id
      title
    }
  }
`;

export const createTeacherQuery = gql`
  mutation createTeacher(
    $firstName: String!
    $lastName: String!
    $subjectIds: [Int]!
  ) {
    createTeacher(
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

export const deleteTeacherQuery = gql`
  mutation deleteTeacher($id: ID!) {
    deleteTeacher(id: $id) {
      id
    }
  }
`;
