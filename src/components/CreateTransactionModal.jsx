// Dependencies
import React from 'react';
import propTypes from 'prop-types';
import { BottomModal } from 'react-spring-modal';

// Contexts
import FormProvider from '@contexts/form';

// Components
import { TransactionForm } from '@components';

const Transaction = ({ open, setOpen, setLoading }) => (
  <BottomModal isOpen={open} onRequestClose={() => setOpen(false)}>
    <FormProvider
      initialValues={{
        description: 'Cinema',
        ammount: '400',
        currency: 'USD'
      }}
    >
      <TransactionForm setOpenModal={setOpen} setLoading={setLoading} />
    </FormProvider>
  </BottomModal>
);

Transaction.propTypes = {
  open: propTypes.bool.isRequired,
  setOpen: propTypes.func.isRequired,
  setLoading: propTypes.func.isRequired
};

export default Transaction;
