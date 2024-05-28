import { gql } from "@apollo/client";

export const getSubjectsPageData = gql`
  query GetSubjectsPageData {
    subjects {
      id
      title
      teacher {
        firstName
        lastName
      }
    }
  }
`;

export const createSubjectQuery = gql`
  mutation createSubject($title: String!) {
    createSubject(input: { title: $title }) {
      title
    }
  }
`;

export const deleteSubjectQuery = gql`
  mutation deleteSubject($id: ID!) {
    deleteSubject(id: $id) {
      id
    }
  }
`;
