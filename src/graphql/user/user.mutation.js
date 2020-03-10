// Dependencies
import { gql } from 'apollo-boost';

export default gql`
  mutation user(
    $firstName: String
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    user(
      input: {
        firstName: $firstName
        lastName: $lastName
        username: $username
        email: $email
        password: $password
      }
    ) {
      id
      username
      email
    }
  }
`;
