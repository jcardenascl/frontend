// Dependencies
import React, { createContext, useState } from 'react';
import propTypes from '@propTypes';
import { useApolloClient } from 'react-apollo-hooks';
import { useCookies } from 'react-cookie';
import { getGraphQlError } from 'fogg-utils';
import { getUserData } from '@lib/jwt';

// Mutations
import CREATE_USER_MUTATION from '@graphql/user/user.mutation';
// import LOGIN_MUTATION from '@graphql/user/login.mutation';

export const UserContext = createContext({
  createUser: () => undefined,
  getUser: () => undefined,
  login: () => undefined,
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

  const context = {
    createUser,
    getUser,
    // login,
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
