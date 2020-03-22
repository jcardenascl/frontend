// Dependencies
import React from 'react';
import propTypes from 'prop-types';
import { BottomModal } from 'react-spring-modal';

// Contexts
import FormProvider from '@contexts/form';

// Components
import { TransactionForm } from '@components';

const Transaction = ({ open, setOpen }) => (
  <BottomModal isOpen={open} onRequestClose={() => setOpen(false)}>
    <FormProvider
      initialValues={{
        description: '',
        ammount: '',
        currency: 'USD'
      }}
    >
      <TransactionForm setOpenModal={setOpen} />
    </FormProvider>
  </BottomModal>
);

Transaction.propTypes = {
  open: propTypes.bool.isRequired,
  setOpen: propTypes.func.isRequired
};

export default Transaction;
