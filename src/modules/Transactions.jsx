// Dependencies
import React, { useContext } from 'react';
import propTypes from 'prop-types';

// Contexts
import { TransactionContext } from '@contexts/transactions';

// Actions
import Read from '@actions/Read';

const Home = ({ action = 'read', user, id = null, page }) => {
  const { readTransactions } = useContext(TransactionContext);
  console.log(action, user);

  if (action === 'read') {
    return (
      <Read
        module="transactions"
        caption="Transactions"
        read={readTransactions}
        head={['Description', 'Ammount', 'Currency']}
        body={['description', 'ammount', 'currency']}
        page={page}
      />
    );
  }

  return (
    <Read
      module="transactions"
      caption="Transactions"
      read={readTransactions}
      head={['Description', 'Ammount', 'Currency']}
      body={['description', 'ammount', 'currency']}
      page={page}
    />
  );
};

Home.defaultProps = {
  action: '',
  user: {},
  id: ''
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
  page: propTypes.number.isRequired
};

export default Home;
