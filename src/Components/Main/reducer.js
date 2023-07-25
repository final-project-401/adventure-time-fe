// locationReducer.js
const initialState = {
  location: {},
  postalCode: '',
  requestingLocation: false,
  locationError: null,
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_LOCATION':
      return {
        ...state,
        requestingLocation: true,
        locationError: null,
      };
    case 'RECEIVE_LOCATION':
      return {
        ...state,
        location: action.payload.location,
        postalCode: action.payload.postalCode,
        requestingLocation: false,
      };
    case 'LOCATION_ERROR':
      return {
        ...state,
        requestingLocation: false,
        locationError: action.payload,
      };
    case 'UPDATE_POSTAL_CODE':
      return {
        ...state,
        postalCode: action.payload,
      };
    default:
      return state;
  }
};

export default locationReducer;
