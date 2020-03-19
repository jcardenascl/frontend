// Dependencies
import { gql } from 'apollo-boost';

export default gql`
  mutation googleAuth($accessToken: String!) {
    googleAuth(input: { accessToken: $accessToken }) {
      name
      token
    }
  }
`;
