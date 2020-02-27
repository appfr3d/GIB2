import { useState, useEffect } from 'react';
import { alert } from 'react-native';
import axios from 'axios';

const url = 'http://d503a97d.ngrok.io/restaurant';

export default function useRestaurants() {
  const [restaurants, setRestaurants] = useState();

  // UseEffect cannot be async in itself, so need to define an async function.
  async function fetchRestaurants() {
    try {
      const response = await axios.get(url);
      setRestaurants(response.data);
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return [restaurants];
}
