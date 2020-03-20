// Dependencies
import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import { useCookies } from 'react-cookie';

// Hooks
import useApolloClient from '@apollo-client';

// Components
import { Dashboard } from '@components';

// Contexts
import UserProvider from '@contexts/user';

const Home = props => {
  // Cookies
  const [cookies] = useCookies();

  return (
    <ApolloProvider client={useApolloClient(cookies.at)}>
      <UserProvider>
        <Dashboard {...props} />
      </UserProvider>
    </ApolloProvider>
  );
};

export default Home;
