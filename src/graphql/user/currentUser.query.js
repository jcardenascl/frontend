// Dependencies
import { gql } from 'apollo-boost';

export default gql`
  query currentUser {
    currentUser {
      id
      firstName
      lastName
      username
      avatar
      email
      salary
      transactions {
        id
        description
        ammount
        currency
        createdAt
      }
    }
  }
`;
