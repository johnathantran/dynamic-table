import React, { useState, createContext } from 'react';

const initialState = {
  show: false,
  text: '',
  style: 'success',
  autoHide: true
};

const AlertContext = createContext();

function AlertProvider(props) {
  const [alert, setAlert] = useState(initialState);

  return <AlertContext.Provider value={{ alert, setAlert }}>{props.children}</AlertContext.Provider>;
}

export { AlertContext, AlertProvider };
