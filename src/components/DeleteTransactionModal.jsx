// Dependencies
import React, { useState, useContext } from 'react';
import propTypes from 'prop-types';
import { CenterModal } from 'react-spring-modal';
import { TrashOutlineMd } from 'react-heroicons';
import Tippy from '@tippyjs/react';

// Contexts
import { TransactionContext } from '@contexts/transactions';

// Components
import { Alert } from '@components';

const Transaction = ({ id, title }) => {
  // States
  const [openDelete, setDelete] = useState(false);
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [invalidDelete, setInvalidDelete] = useState(false);

  // Contexts
  const { deleteTransaction } = useContext(TransactionContext);

  // Methods
  const handleChange = e => {
    setText(e.target.value);
  };

  const handleDelete = async transactionId => {
    const response = await deleteTransaction(transactionId);

    if (response.error) {
      setInvalidDelete(true);
      setErrorMessage(response.message);
    } else {
      setText('');
      setDelete(false);
    }
  };

  // Render
  return (
    <>
      <Tippy content="Delete">
        <button
          type="button"
          title="Delete"
          className="p-3 mx-2 text-gray-700 transition-all duration-200 border rounded-full cursor-pointer focus:outline-none focus:shadow-outline hover:text-gray-600"
          onClick={() => setDelete(!openDelete)}
        >
          <TrashOutlineMd className="w-5 h-5" />
        </button>
      </Tippy>

      <CenterModal
        className="w-full max-w-lg p-5 bg-white rounded"
        key={id}
        isOpen={openDelete}
        onRequestClose={() => setDelete(false)}
      >
        <h2 className="pb-4 text-xl font-bold text-center text-gray-700 uppercase border-b">
          Delete transaction: {title}
        </h2>

        <div className="mt-4 mb-8">
          <label
            className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
            htmlFor="description"
          >
            Please type &quot;DELETE&quot; in uppercase to confirm
          </label>
          <input
            className="block w-full px-4 py-3 leading-tight text-gray-700 transition-all duration-200 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-yellow-500 focus:shadow-outline"
            id={`delete-${id}`}
            name="delete"
            onChange={handleChange}
            type="text"
            value={text}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="px-6 py-2 font-bold text-gray-700 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            className={`px-6 py-2 font-bold text-white bg-red-700 rounded transition-all duration-200${
              text !== 'DELETE' && ' opacity-75 pointer-events-none'
            }`}
            disabled={text !== 'DELETE'}
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </div>

        <Alert
          message={errorMessage}
          open={invalidDelete}
          onClose={setInvalidDelete}
        />
      </CenterModal>
    </>
  );
};

Transaction.propTypes = {
  id: propTypes.string.isRequired,
  title: propTypes.string.isRequired
};

export default Transaction;
