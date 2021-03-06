import { useEffect } from 'react';
// import { Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { useFilterDispatch } from '../../context/FilterContext';

function FilterLocation() {
  const filterDispatch = useFilterDispatch();
  // const [filterOnYourLocation, setFilterOnYourLocation] = useState(false);
  async function getLocationAsync() {
    // setFilterOnYourLocation(true);
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    // eslint-disable-next-line no-unused-vars
    const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      console.log(location);
      filterDispatch({ type: 'set_position', payload: location });
    } else {
      // setFilterOnYourLocation(false);
      throw new Error('Location permission not granted');
    }
  }

  useEffect(() => {
    getLocationAsync();
  }, []);

  return null;
  // return (
  //   <Button
  //     title="Your location"
  //     onPress={getLocationAsync}
  //     color={filterOnYourLocation ? 'green' : 'black'}
  //   />
  // );
}

export default FilterLocation;
