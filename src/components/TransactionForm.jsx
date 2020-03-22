// Dependencies
import React, { useContext } from 'react';
import Select from 'react-select';

// Contexts
import { FormContext } from '@contexts/form';

const options = [
  { value: 'USD', label: 'USD', selected: true },
  { value: 'VEF', label: 'VEF' }
];

const customStyles = {
  container: base => ({
    ...base,
    border: 0,
    fontSize: 16
  }),
  control: base => ({
    ...base,
    color: '#4a5568', // gray-700
    backgroundColor: '#edf2f7', // gray-200
    border: '1px solid #edf2f7', // gray-200
    borderRadius: '.25rem',
    boxShadow: 'none',

    '&:focus': {
      borderColor: '#ecc94b',
      boxShadow: '0 0 0 3px rgba(66,153,225,.5)'
    },

    '&:hover': {
      borderColor: '#edf2f7' // gray-200
    }
  }),
  dropdownIndicator: base => ({
    ...base,
    padding: '.75rem 1rem'
  }),
  valueContainer: base => ({
    ...base,
    padding: '.75rem 1rem'
  }),
  input: base => ({
    ...base,
    margin: 0,
    padding: 0
  }),
  menu: base => ({
    ...base,
    borderRadius: 0,
    boxShadow: 'none',
    transition: 'all 150ms'
  }),
  menuList: base => ({
    ...base,
    borderRadius: '.25rem',
    boxShadow:
      '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    padding: 0
  }),
  option: (_, state) => ({
    backgroundColor: '#edf2f7', // gray-200
    borderBottom: '1px solid #cbd5e0', // gray-400
    color: '#4a5568', // gray-700
    padding: '.75rem 1rem',
    transition: 'color 150ms',

    '&:last-child': {
      border: 0
    }
  }),
  singleValue: base => ({
    ...base,
    color: '#4a5568' // gray-700
  })
};

const TransactionForm = () => {
  // Contexts
  const { handleInputChange, values } = useContext(FormContext);

  return (
    <div>
      <h2 className="pb-2 mb-6 text-2xl font-bold text-center text-gray-700 border-b">
        New Transaction
      </h2>

      <div className="w-full px-3 mb-6">
        <label
          className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
          htmlFor="description"
        >
          Description
        </label>
        <input
          className="block w-full px-4 py-3 leading-tight text-gray-700 transition-all duration-200 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-yellow-500 focus:shadow-outline"
          id="description"
          name="description"
          placeholder="Cinema"
          onChange={handleInputChange}
          type="text"
          value={values.description}
        />
      </div>

      <div className="w-full px-3 mb-6">
        <label
          className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
          htmlFor="ammount"
        >
          Ammount
        </label>
        <input
          className="block w-full px-4 py-3 leading-tight text-gray-700 transition-all duration-200 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-yellow-500 focus:shadow-outline"
          id="ammount"
          name="ammount"
          placeholder="400"
          onChange={handleInputChange}
          type="number"
          value={values.ammount}
        />
      </div>

      <div className="w-full px-3 mb-6">
        <label
          className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
          htmlFor="currency"
        >
          Currency
        </label>

        <Select
          defaultValue={options[0]}
          id="currency"
          name="currency"
          menuPlacement="auto"
          options={options}
          styles={customStyles}
        />
      </div>

      <div className="w-full px-3">
        <button
          className="block w-full px-6 py-2 text-white bg-yellow-900 rounded shadow focus:outline-none"
          type="button"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TransactionForm;
