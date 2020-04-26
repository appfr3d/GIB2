import { useState, useEffect } from 'react';
import axios from 'axios';
import { useFilterState } from '../context/FilterContext';
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
  const filterState = useFilterState();

  // UseEffect cannot be async in itself, so need to define an async function.
  async function fetchRestaurants() {
    const endpoint = { all: '', filter: '/filter', search: '/search' }[filterState.mode];
    const params = {
      all: null,
      filter: { ...filterState.filter, kitchens: filterState.filter.kitchens.toString() },
      search: filterState.search,
    }[filterState.mode];
    const url = `${config.apiDomain}/restaurant${endpoint}`;
    console.log(params);
    try {
      console.log('Trying');
      const response = await axios.get(url, {
        params,
        timeout: 5000,
      });
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
