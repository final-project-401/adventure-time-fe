import axios from 'axios';

// locationActions.js
const requestLocation = () => ({ type: 'REQUEST_LOCATION' });
const receiveLocation = (location, postalCode) => ({
  type: 'RECEIVE_LOCATION',
  payload: { location, postalCode },
});
const locationError = (error) => ({ type: 'LOCATION_ERROR', payload: error });

export const updatePostalCode = (postalCode) => ({ type: 'UPDATE_POSTAL_CODE', payload: postalCode });

export const fetchLocation = () => (dispatch) => {
  dispatch(requestLocation());
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        dispatch(receiveLocation({ lat, lon }));
        dispatch(getPostalCode(lat, lon));
      },
      (error) => {
        dispatch(locationError('Unable to retrieve location.'));
      }
    );
  } else {
    dispatch(locationError('Geolocation not supported'));
  }
};

const getPostalCode = (lat, lon) => async (dispatch) => {
  try {
    let apiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
    let dataFromAPI = await axios.get(apiUrl);
    dispatch(updatePostalCode(dataFromAPI.data.postcode));
  } catch (error) {
    console.error(error || error.message);
  }
};
