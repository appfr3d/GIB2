import React, { useState, useContext, createContext } from 'react';
// import { AsyncStorage } from 'react-native';
import axios from 'axios';
import config from '../config';

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = async (username, password) => {
    const auth = { username, password };
    console.log('logging in ', username);
    console.log(password);
    console.log(auth);
    const response = await axios(`${config.domain}/token`, {
      // method: 'GET',
      auth: { username, password },
      // headers: { Authorization: 'Basic dGVzdHU6dGVzdHA=' },
      proxy: { host: 'localhost', port: 5000 },
      timeout: 10000,
    });
    console.log(response.data);
  };

  // const signup = (email, password) => {
  //   return firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(response => {
  //       setUser(response.user);
  //       return response.user;
  //     });
  // };

  // const signout = () => {
  //   return firebase
  //     .auth()
  //     .signOut()
  //     .then(() => {
  //       setUser(false);
  //     });
  // };

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
    // signup,
    // signout,
    // sendPasswordResetEmail,
    // confirmPasswordReset,
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
