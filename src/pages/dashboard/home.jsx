// Dependencies
import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';

// Hooks
import useApolloClient from '@apollo-client';

// Components
import { Dashboard } from '@components';

// Contexts
import UserProvider from '@contexts/user';

const Home = props => {
  return (
    <ApolloProvider client={useApolloClient()}>
      <UserProvider>
        <Dashboard {...props} />
      </UserProvider>
    </ApolloProvider>
  );
};

export default Home;
