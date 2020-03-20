// Dependencies
import { gql } from 'apollo-boost';

export default gql`
  query transactions(
    $orderBy: String
    $direction: String
    $limit: Int
    $offset: Int
  ) {
    transactions(
      options: {
        orderBy: $orderBy
        direction: $direction
        limit: $limit
        offset: $offset
      }
    ) {
      id
      description
      ammount
      currency
      createdAt
      updatedAt
      user {
        id
        username
        email
      }
    }
  }
`;
