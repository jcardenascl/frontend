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
import { Layout, RegisterForm } from '@components';

const Register = ({
  currentUrl = isBrowser()
    ? window.location.search.replace('?redirectTo=', '')
    : ''
}) => (
  <ApolloProvider client={useApolloClient()}>
    <UserProvider>
      <FormProvider
        initialValues={{
          firstName: 'Daniel',
          lastName: 'Esteves',
          username: 'danestves',
          email: 'estevesd8@gmail.com',
          password: '12345678'
        }}
      >
        <Layout>
          <RegisterForm currentUrl={currentUrl} />
        </Layout>
      </FormProvider>
    </UserProvider>
  </ApolloProvider>
);

Register.defaultProps = {
  currentUrl: ''
};

Register.propTypes = {
  currentUrl: propTypes.string
};

export default Register;
