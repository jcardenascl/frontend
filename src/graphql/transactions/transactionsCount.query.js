// Dependencies
import { gql } from 'apollo-boost';

export default gql`
  query transactionsCount {
    transactionsCount {
      count
    }
  }
`;
