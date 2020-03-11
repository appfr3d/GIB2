import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FilterStateContext } from '../context/FilterContext';

const domain = 'https://56e3dc93.ngrok.io';

export default function useRestaurants() {
  const [restaurants, setRestaurants] = useState();
  const filterState = useContext(FilterStateContext);

  // UseEffect cannot be async in itself, so need to define an async function.
  async function fetchRestaurants() {
    const url = `${domain}/restaurant/filter`;
    try {
      const response = await axios.get(url, { params: filterState, timeout: 5000 });
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchRestaurants();
  }, [filterState]);

  return [restaurants];
}
