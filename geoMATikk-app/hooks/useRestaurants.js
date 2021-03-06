import { useState, useEffect } from 'react';
import axios from 'axios';
import { useFilterState } from '../context/FilterContext';
import config from '../config';

// const mockRestaurants = [
//   {
//     description: 'Burger <3',
//     id: 9,
//     image_url: '',
//     location: {
//       latitude: 63.430646,
//       longitude: 10.397,
//     },
//     name: 'MacDonald',
//     phone: '12345678',
//     price_class: 2,
//     rating: 4,
//   },
// ];

export default function useRestaurants() {
  const [restaurants, setRestaurants] = useState();
  const filterState = useFilterState();

  // UseEffect cannot be async in itself, so need to define an async function.
  async function fetchRestaurants() {
    // console.log('FETCHING');
    const endpoint = filterState.search ? '/search' : '/filter';
    const params = filterState.search
      ? { search: filterState.search }
      : { ...filterState.filter, kitchens: filterState.filter.kitchens.toString() };
    const url = `${config.apiDomain}/restaurant${endpoint}`;
    try {
      const response = await axios.get(url, {
        params,
        timeout: 5000,
      });
      if (response.status === 200) {
        const { data } = response;
        setRestaurants(data);
      } else {
        console.log(response.data.error);
      }
    } catch (error) {
      console.log('Error:', error);
      // setRestaurants(mockRestaurants);
    }
  }

  useEffect(() => {
    fetchRestaurants();
  }, [filterState.search]);

  return [restaurants, fetchRestaurants];
}
