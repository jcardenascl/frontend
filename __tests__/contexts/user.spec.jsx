import React from 'react';
import { render } from '@testing-library/react';
import { useApolloClient } from 'react-apollo-hooks';
import { getGraphQlError } from 'fogg-utils';

import CREATE_USER_MUTATION from '@graphql/user/user.mutation';

import UserProvider, { UserContext } from '@contexts/user';

jest.mock('react-apollo-hooks', () => ({
  useApolloClient: jest.fn()
}));
jest.mock('fogg-utils', () => ({
  getGraphQlError: jest.fn()
}));
jest.mock('@graphql/user/user.mutation', () => 'mutation user()');

describe('User Context Provider', () => {
  it('should provide create user method and interact with graphql', async() => {
    const responseUserData = {
      user: {
        name: 'Gonzalo',
        lastName: 'Pincheira'
      }
    };
    const mutate = jest
      .fn()
      .mockReturnValue(Promise.resolve({ data: responseUserData }));
    useApolloClient.mockReturnValue({
      query: jest.fn(),
      mutate
    });

    let createUser = () => {};
    render(
      <UserProvider>
        <UserContext.Consumer>
          {value => {
            createUser = value.createUser;
            return null;
          }}
        </UserContext.Consumer>
      </UserProvider>
    );

    const newUserData = {
      username: 'gpincheiraa',
      email: 'gpincheiraa@react.com',
      password: 'mostSecurePassword'
    };
    const userData = await createUser(newUserData);

    expect(mutate).toHaveBeenCalledWith({
      mutation: CREATE_USER_MUTATION,
      variables: {
        ...newUserData,
        firstName: '',
        lastName: ''
      }
    });
    expect(userData).toEqual(responseUserData.user);
  });

  it('should use getGraphQlError method to return error', async () => {
    const error = new Error();
    const mutate = jest.fn().mockReturnValue(Promise.reject(error));
    useApolloClient.mockReturnValue({
      query: jest.fn(),
      mutate
    });
    getGraphQlError.mockReturnValue(error);

    let createUser = () => {};
    render(
      <UserProvider>
        <UserContext.Consumer>
          {value => {
            createUser = value.createUser;
            return null;
          }}
        </UserContext.Consumer>
      </UserProvider>
    );

    const newUserData = {
      username: 'gpincheiraa',
      email: 'gpincheiraa@react.com',
      password: 'mostSecurePassword'
    };
    const userDataError = await createUser(newUserData);

    expect(mutate).toHaveBeenCalledWith({
      mutation: CREATE_USER_MUTATION,
      variables: {
        ...newUserData,
        firstName: '',
        lastName: ''
      }
    });
    expect(userDataError).toEqual(error);
  });
});
