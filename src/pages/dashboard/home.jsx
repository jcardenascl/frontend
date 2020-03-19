// Dependencies
import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';

// Hooks
import useApolloClient from '@apollo-client';

// Components
import { DashboardLayout } from '@components';

// Contexts
import UserProvider from '@contexts/user';

const Home = props => {
  return (
    <ApolloProvider client={useApolloClient()}>
      <UserProvider>
        <DashboardLayout {...props} />
      </UserProvider>
    </ApolloProvider>
  );
};

export default Home;
