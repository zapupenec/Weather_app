import { useState, } from 'react'
import { ErrorContext } from './ErrorContext';

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState([]);
  return (
    <ErrorContext.Provider value={{error, setError}}>
      {children}
    </ErrorContext.Provider>
  );
};
