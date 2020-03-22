// Dependencies
import { gql } from 'apollo-boost';

export default gql`
  mutation deleteTransaction($id: ID!) {
    deleteTransaction(id: $id)
  }
`;
