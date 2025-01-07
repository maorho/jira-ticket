// context/AuthContext.js
'use client';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [apiToken, setApiToken] = useState('');

  const login = () => {
    setIsLoggedIn(true);
  };

  const setUser = (e)=>{
        setUsername(e)
  }

  const setEmailContext = (e)=>{
    setEmail(e)
  }
  const setApiTokenContext = (e)=>{
    setApiToken(e)
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, email, apiToken, login,setUser,setEmailContext,setApiTokenContext}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
