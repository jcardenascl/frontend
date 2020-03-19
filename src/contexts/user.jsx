// Dependencies
import React, { createContext, useState } from 'react';
import propTypes from 'prop-types';
import { useApolloClient } from 'react-apollo-hooks';
import { useCookies } from 'react-cookie';
import { getGraphQlError } from 'fogg-utils';
import { getUserData } from '@lib/jwt';

// Mutations
import CREATE_USER_MUTATION from '@graphql/user/user.mutation';
import GOOGLE_MUTATION from '@graphql/user/googleAuth.mutation';
import FACEBOOK_MUTATION from '@graphql/user/facebookAuth.mutation';

// import LOGIN_MUTATION from '@graphql/user/login.mutation';

export const UserContext = createContext({
  createUser: () => undefined,
  getUser: () => undefined,
  login: () => undefined,
  google: () => undefined,
  facebook: () => undefined,
  user: {}
});

const UserProvider = ({ children }) => {
  const { mutate } = useApolloClient();
  const [, setCookie] = useCookies();
  const [user, setUser] = useState();

  async function createUser({
    firstName = '',
    lastName = '',
    username,
    email,
    password
  }) {
    let userData;

    try {
      const { data } = await mutate({
        mutation: CREATE_USER_MUTATION,
        variables: {
          firstName,
          lastName,
          username,
          email,
          password
        }
      });

      if (data) {
        userData = data.user;
      }
    } catch (err) {
      return getGraphQlError(err);
    }

    return userData;
  }

  async function getUser() {
    const [cookies] = useCookies();

    const userData = await getUserData(cookies);

    if (!user) setUser(userData);

    return userData;
  }

  // Fetch user
  getUser();

  // async function login({ email, password }) {
  //   let token;

  //   try {
  //     const { data } = await mutate({
  //       mutation: LOGIN_MUTATION,
  //       variables: {
  //         email,
  //         password
  //       }
  //     });

  //     if (data) {
  //       setCookie('at', data.login.token, { path: '/' });
  //       setUser(data.login.token);

  //       token = data.login.token;
  //     }
  //   } catch (err) {
  //     return getGraphQlError(err);
  //   }

  //   return token;
  // }

  async function google(accessToken) {
    let token;

    try {
      const { data } = await mutate({
        mutation: GOOGLE_MUTATION,
        variables: {
          accessToken
        }
      });

      if (data) {
        setCookie('at', data.googleAuth.token, { path: '/' });
        setUser(data.googleAuth.token);

        token = data.googleAuth.token;
      }
    } catch (err) {
      return getGraphQlError(err);
    }

    return token;
  }

  async function facebook(accessToken) {
    let token;

    try {
      const { data } = await mutate({
        mutation: FACEBOOK_MUTATION,
        variables: {
          accessToken
        }
      });

      if (data) {
        setCookie('at', data.facebookAuth.token, { path: '/' });
        setUser(data.facebookAuth.token);

        token = data.facebookAuth.token;
      }
    } catch (err) {
      return getGraphQlError(err);
    }

    return token;
  }

  const context = {
    createUser,
    getUser,
    // login,
    google,
    facebook,
    user
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node
  ]).isRequired
};

export default UserProvider;
