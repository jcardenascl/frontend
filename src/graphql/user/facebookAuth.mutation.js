// Dependencies
import { gql } from 'apollo-boost';

export default gql`
  mutation facebookAuth($accessToken: String!) {
    facebookAuth(input: { accessToken: $accessToken }) {
      name
      token
    }
  }
`;
