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
import TransactionsProvider from '@contexts/transactions';

const Home = props => {
  // Cookies
  const [cookies] = useCookies();

  return (
    <ApolloProvider client={useApolloClient(cookies.at)}>
      <UserProvider>
        <TransactionsProvider>
          <Dashboard {...props} />
        </TransactionsProvider>
      </UserProvider>
    </ApolloProvider>
  );
};

export default Home;
