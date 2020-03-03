import { useState, useEffect, useReducer } from 'react';
import { alert } from 'react-native';
import axios from 'axios';

const domain = 'https://f15f6496.ngrok.io';

function queryReducer(state, action) {
  switch (action.type) {
    case 'set_search_string':
      return { ...state, search: action.payload };

    default:
      return state;
  }
}

export default function useRestaurants() {
  const [restaurants, setRestaurants] = useState();
  const [queryState, queryDispatch] = useReducer(queryReducer, {});

  // UseEffect cannot be async in itself, so need to define an async function.
  async function fetchRestaurants() {
    const url = `${domain}/restaurant/filter`;
    try {
      console.log('hey', url);
      const response = await axios.get(url, { params: queryState });
      console.log(response.data);
      setRestaurants(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchRestaurants();
  }, [queryState]);

  return [{ restaurants, queryState }, queryDispatch];
}
