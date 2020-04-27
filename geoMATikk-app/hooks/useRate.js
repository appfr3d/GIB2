import { useState } from 'react';
import axios from 'axios';
import config from '../config';

// Hook that handles rating state
export default function useRate() {
  const defaultRateState = { loading: false, error:  '', done: false };
  const [rateState, setRateState] = useState(defaultRateState);

  const [restaurantID, setRestaurantID] = useState(null);
  const [price, setPrice] = useState(null);
  const [rating, setRating] = useState(null);

  const rateRestaurant = async (userToken) => {
    setRateState({ loading: true, error: '' });

    // Set errors
    if (!userToken) {
      setRateState({ loading: false, done: false, error: 'Du er ikke logget inn' });
    } else if (!restaurantID) {
      setRateState({ loading: false, done: false, error: 'En feil har skjedd, finner ikke restauranten' });
    } else if (!price) {
      setRateState({ loading: false, done: false, error: 'Du har ikke valgt prisklasse' });
    } else if (!rating) {
      setRateState({ loading: false, done: false, error: 'Du har ikke valgt antall stjerner' });
    } else {
      // Do the request
      try {
        const response = await axios(`${config.apiDomain}/restaurant/rate`, {
          method: 'POST',
          auth: { username: userToken },
          data: {
            restaurant_id: restaurantID,
            price: price,
            rating: rating
          }
        });
        setRateState({ loading: false, done: true, error: '' });
      } catch (error) {
        setRateState({ loading: false, done: false, error: 'Får ikke kontakt med serveren, er du koblet til internett?' });
      }
    }
  }

  // Return the rateState object and rate methods
  return [rateState, { rateRestaurant, setRestaurantID, setPrice, setRating}];
}
