import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FilterStateContext } from '../context/FilterContext';
import config from '../config';

const mockRestaurants = [
  {
    description: 'Burger <3',
    id: 9,
    image_url: '',
    location: {
      latitude: 63.430646,
      longitude: 10.397,
    },
    name: 'MacDonald',
    phone: '12345678',
    price_class: 2,
    rating: 4,
  },
];

export default function useRestaurants() {
  const [restaurants, setRestaurants] = useState();
  const filterState = useContext(FilterStateContext);

  // UseEffect cannot be async in itself, so need to define an async function.
  async function fetchRestaurants() {
    const url = `${config.apiDomain}/restaurant/filter`;
    console.log(filterState);
    try {
      console.log('Trying');
      const response = await axios.get(url, { params: filterState, timeout: 5000 });
      setRestaurants(response.data);
    } catch (error) {
      console.log('Error:', error);
      setRestaurants(mockRestaurants);
    }
  }

  useEffect(() => {
    console.log('HEYHEY', filterState);
    fetchRestaurants();
  }, [filterState]);

  return [restaurants];
}
