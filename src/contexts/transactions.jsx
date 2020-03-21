// Dependencies
import React, { createContext, useState } from 'react';
import propTypes from 'prop-types';
import { useApolloClient } from 'react-apollo-hooks';
import { getGraphQlError } from 'fogg-utils';

// Queries
import GET_TRANSACTIONS_COUNT_QUERY from '@graphql/transactions/transactionsCount.query';
import GET_TRANSACTIONS_QUERY from '@graphql/transactions/transactions.query';

// Mutations
import CREATE_TRANSACTION_MUTATION from '@graphql/user/user.mutation';

export const TransactionContext = createContext({
  createTransaction: () => undefined,
  readTransactions: () => undefined
});

const TransactionProvider = ({ children }) => {
  const { query, mutate } = useApolloClient();
  const [transactions, setTransactions] = useState([]);

  async function createTransaction({ description, ammount, currency = 'USD' }) {
    let transaction;

    try {
      const { data } = await mutate({
        mutation: CREATE_TRANSACTION_MUTATION,
        variables: {
          description,
          ammount,
          currency
        }
      });

      if (data) {
        transaction = data.transaction;
      }
    } catch (err) {
      return getGraphQlError(err);
    }

    return transaction;
  }

  async function readTransactions(page) {
    const { data: count } = await query({
      query: GET_TRANSACTIONS_COUNT_QUERY
    });

    const { data } = await query({
      query: GET_TRANSACTIONS_QUERY,
      variables: {
        orderBy: 'createdAt',
        direction: 'desc',
        limit: 10,
        offset: page === 1 ? 0 : (page - 1) * 10
      }
    });

    if (!count && !data) {
      return null;
    }

    setTransactions(data.transactions);

    return {
      count: count.transactionsCount.count,
      data: data.transactions
    };
  }

  const context = {
    createTransaction,
    readTransactions,
    transactions
  };

  return (
    <TransactionContext.Provider value={context}>
      {children}
    </TransactionContext.Provider>
  );
};

TransactionProvider.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node
  ]).isRequired
};

export default TransactionProvider;
