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
  const getContextValue = async () => {
    let contextValue;
    await render(
      <UserProvider>
        <UserContext.Consumer>
          {value => {
            contextValue = value;
            return null;
          }}
        </UserContext.Consumer>
      </UserProvider>
    );
    return contextValue;
  };

  it('should provide create user method and interact with graphql', async () => {
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

    const newUserData = {
      username: 'gpincheiraa',
      email: 'gpincheiraa@react.com',
      password: 'mostSecurePassword'
    };
    const { createUser } = await getContextValue();
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

    const newUserData = {
      username: 'gpincheiraa',
      email: 'gpincheiraa@react.com',
      password: 'mostSecurePassword'
    };
    const { createUser } = await getContextValue();
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
