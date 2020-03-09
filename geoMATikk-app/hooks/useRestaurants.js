import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const domain = 'http://a09eabf1.ngrok.io';

function queryReducer(state, action) {
  switch (action.type) {
    case 'set_search_string':
      return { ...state, search: action.payload };

    default:
      console.warning(action.type);
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
      const response = await axios.get(url, { params: queryState });
      setRestaurants(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchRestaurants();
  }, [queryState]);

  return [{ restaurants, queryState }, queryDispatch];
}
