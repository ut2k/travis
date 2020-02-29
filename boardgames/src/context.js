import React, { useEffect, createContext, useState } from 'react';
import { db } from './firebase';

const AppState = createContext(null);
const { Provider } = AppState; 

const StateProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) setData(snap.val());
    }
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);

  const api = { data };
  return <Provider value={api}>{children}</Provider>;
};

export { AppState, StateProvider };