// Dependencies
import React, { useState, useContext, useEffect } from 'react';
import propTypes from 'prop-types';

// Contexts
import { TransactionContext } from '@contexts/transactions';

// Actions
import Read from '@actions/Read';

// Components
import { Loading } from '@components';

const Home = ({ action = 'read', user, id = null, page }) => {
  // States
  const [loading, setLoading] = useState(true);

  // Contexts
  const { readTransactions } = useContext(TransactionContext);

  // Effects
  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  if (action === 'read') {
    return (
      <Read
        module="transactions"
        caption="Transactions"
        read={readTransactions}
        page={page}
      />
    );
  }

  return (
    <Read
      module="transactions"
      caption="Transactions"
      read={readTransactions}
      page={page}
    />
  );
};

Home.defaultProps = {
  action: '',
  user: {},
  id: '',
  page: 1
};

Home.propTypes = {
  action: propTypes.string,
  user: propTypes.shape({
    id: propTypes.string,
    username: propTypes.string,
    email: propTypes.string,
    token: propTypes.string
  }),
  id: propTypes.string,
  page: propTypes.number
};

export default Home;
