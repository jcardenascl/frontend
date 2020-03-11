// Dependencies
import React, { useState, createContext } from 'react';
import propTypes from 'prop-types';

export const FormContext = createContext({
  handleInputChange: () => undefined,
  setValues: () => undefined,
  setValue: () => undefined,
  clearValues: () => undefined,
  clearValue: () => undefined,
  values: {}
});

const FormProvider = ({ children, initialValues = {} }) => {
  const [state, setState] = useState(initialValues);

  function setValues(values) {
    const newState = { ...state, ...values };

    setState(newState);
  }

  function setValue(name, value) {
    if (state[name] !== value) {
      setState(oldState => ({
        ...oldState,
        [name]: value
      }));
    }
  }

  function clearValues(fields) {
    const newState = { ...state };

    fields.forEach(field => {
      newState[field] = '';
    });

    setState(newState);
  }

  function clearValue(field) {
    if (field) {
      setValue(field, '');
    }
  }

  function handleInputChange({ target: { name, value } }) {
    if (state[name] !== value) {
      setState(oldState => ({
        ...oldState,
        [name]: value
      }));
    }
  }

  const context = {
    handleInputChange,
    setValues,
    setValue,
    clearValues,
    clearValue,
    values: state
  };

  return (
    <FormContext.Provider value={context}>{children}</FormContext.Provider>
  );
};

FormProvider.propTypes = {
  children: propTypes.oneOfType([
    propTypes.array,
    propTypes.element,
    propTypes.string
  ]).isRequired,
  initialValues: propTypes.oneOfType([propTypes.object]).isRequired
};

export default FormProvider;
