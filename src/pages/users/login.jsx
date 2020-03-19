// Dependencies
import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import propTypes from 'prop-types';
import { isBrowser } from 'fogg-utils';

// Hooks
import useApolloClient from '@apollo-client';

// Contexts
import FormProvider from '@contexts/form';
import UserProvider from '@contexts/user';

// Components
import { Layout, LoginForm } from '@components';

const Login = ({
  currentUrl = isBrowser()
    ? window.location.search.replace('?redirectTo=', '')
    : ''
}) => (
  <ApolloProvider client={useApolloClient()}>
    <UserProvider>
      <FormProvider
        initialValues={{
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          password: ''
        }}
      >
        <Layout>
          <LoginForm currentUrl={currentUrl} />
        </Layout>
      </FormProvider>
    </UserProvider>
  </ApolloProvider>
);

Login.defaultProps = {
  currentUrl: ''
};

Login.propTypes = {
  currentUrl: propTypes.string
};

export default Login;
