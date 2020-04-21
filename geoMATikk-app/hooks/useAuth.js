import React, { useState, useContext, createContext } from 'react';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import config from '../config';

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  // user = { username, token }
  const [user, setUser] = useState();
  const [error, setError] = useState();

  async function cacheAuth(userCache) {
    return AsyncStorage.setItem(config.authStorageKey, JSON.stringify(userCache));
  }

  const signin = async (username, password) => {
    setError(null);
    console.log('logging in ', username, password);
    try {
      const response = await axios(`${config.domain}/token`, {
        method: 'GET',
        auth: { username, password },
      });
      console.log(response.data);
      setUser(response.data);
      cacheAuth(response.data);
    } catch (err) {
      if (err.response.status === 401) {
        setError('Invalid username or password');
      }
    }
  };

  const signup = async (username, password) => {
    setError(null);
    try {
      const response = await axios(`${config.domain}/users`, {
        method: 'POST',
        // headers: { ContentType: 'application/x-www-form-urlencoded' },
        data: {
          username,
          password,
        },
      });
      setUser(response.data);
      cacheAuth(response.data);
    } catch (err) {
      if (err.response.status === 400) {
        setError('User already exists');
      }
      console.log(Object.keys(err.response));
    }
  };

  const signout = async () => {
    setUser(null);
    AsyncStorage.removeItem(config.authStorageKey);
  };

  // const sendPasswordResetEmail = email => {
  //   return firebase
  //     .auth()
  //     .sendPasswordResetEmail(email)
  //     .then(() => {
  //       return true;
  //     });
  // };

  // const confirmPasswordReset = (code, password) => {
  //   return firebase
  //     .auth()
  //     .confirmPasswordReset(code, password)
  //     .then(() => {
  //       return true;
  //     });
  // };

  // // Subscribe to user on mount
  // // Because this sets state in the callback it will cause any ...
  // // ... component that utilizes this hook to re-render with the ...
  // // ... latest auth object.
  // useEffect(() => {
  //   const unsubscribe = firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       setUser(user);
  //     } else {
  //       setUser(false);
  //     }
  //   });

  //   // Cleanup subscription on unmount
  //   return () => unsubscribe();
  // }, []);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    // sendPasswordResetEmail,
    // confirmPasswordReset,
    error,
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
