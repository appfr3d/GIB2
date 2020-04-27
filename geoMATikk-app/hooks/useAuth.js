import React, { useState, useEffect, useContext, createContext } from 'react';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import config from '../config';

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  // user = { username, token }
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCachedAuth();
  }, []);

  async function cacheAuth(userCache) {
    return AsyncStorage.setItem(config.authStorageKey, JSON.stringify(userCache));
  }

  const signin = async (username, password) => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios(`${config.apiDomain}/token`, {
        method: 'GET',
        auth: { username, password },
      });
      setUser(response.data);
      cacheAuth(response.data);
      setLoading(false);
    } catch (err) {
      if (err.response.status === 401) {
        setLoading(false);
        setError('Invalid username or password');
      } else {
        console.log(err.response);
      }
    }
  };

  const signup = async (username, password) => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios(`${config.apiDomain}/users`, {
        method: 'POST',
        // headers: { ContentType: 'application/x-www-form-urlencoded' },
        data: {
          username,
          password,
        },
      });
      setUser(response.data);
      cacheAuth(response.data);
      setLoading(false);
    } catch (err) {
      if (err.response.status === 400) {
        setError('User already exists');
        setLoading(false);
      } else {
        console.log(err.response);
      }
    }
  };

  // const refreshToken = cachedAuth => {
  //   return new Date(accessTokenExpirationDate) < new Date();
  // };

  const getCachedAuth = async () => {
    const value = await AsyncStorage.getItem(config.authStorageKey);
    const cachedAuth = JSON.parse(value);
    if (cachedAuth) {
      // Refreshes token
      try {
        const response = await axios(`${config.apiDomain}/token`, {
          method: 'GET',
          auth: { username: cachedAuth.token },
        });
        setUser(response.data);
        cacheAuth(response.data);
      } catch (err) {
        console.log(err.response.data);
        AsyncStorage.removeItem(config.authStorageKey);
      }
    }
    setLoading(false);
  };

  const signout = async () => {
    setUser(null);
    AsyncStorage.removeItem(config.authStorageKey);
  };

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    getCachedAuth,
    error,
    loading,
  };
}

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};
