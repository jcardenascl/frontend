// Dependencies
import { gql } from 'apollo-boost';

export default gql`
  mutation transaction($description: String!, $ammount: Int!, currency: String!) {
    transaction(
      input: { description: $description, ammount: $ammount, currency: $currency }
    ) {
      id
      description
      ammount
      currency
      createdAt
      updatedAt
    }
  }
`;
