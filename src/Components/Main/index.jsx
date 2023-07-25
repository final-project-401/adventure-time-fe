import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { Check, Edit } from '@mui/icons-material';
import { NearMe } from '@mui/icons-material';
import { TextField, Button } from '@mui/material';
import ActivityCategories from '../Activities/categories';

import Hero from '../Hero';

import './style.css';

// import Paper from '@mui/material/Paper';
// import InputBase from '@mui/material/InputBase';
// import Divider from '@mui/material/Divider';
// import SearchIcon from '@mui/icons-material/Search';
// import StripWeather from '../Weather/stripWidget's

export default function Main() {

  const navigate = useNavigate();

  const [location, setLocation] = useState({});
  const [postalCode, setPostalCode] = useState('');
  const [shouldNavigate, setShouldNavigate] = useState(false); // New state to track navigation
  const [updateLocation, setUpdateLocation] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [postalCodeInput, setPostalCodeInput] = useState(postalCode);
  // const [route, setRoute] = useState('/');

  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;

          setLocation({ lat, lon });
          getPostalCode(lat, lon);
        },
        () => console.log('Unable to retrieve location.')
      );
    } else {
      console.log('Geolocation not supported');
    }
  }
  if (!postalCode) {
    getGeoLocation();
  }

  useEffect(() => {
    if (!postalCode) {
      getGeoLocation();
    }
  }, []);

  const handleLocationClick = () => {
    // getGeoLocation();
    getPostalCode(location.lat, location.lon);
    setPostalCodeInput(postalCode)
  }

  async function getPostalCode(lat, lon) {
    try {
      let apiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      let dataFromAPI = await axios.get(apiUrl);

      setPostalCode(dataFromAPI.data.postcode)
    } catch (error) {
      console.error(error || error.message)
    }
  }

  const handleNavigate = (route) => {
    setShouldNavigate(true);
  }

  const handleSearchClick = async (params) => {
    setPostalCode(params);
    console.log(postalCode);
    handleNavigate();
  }


  const updatePostalCode = () => {
    setUpdateLocation(true);
  };

  const setNewPostalCode = () => {
    setPostalCode(locationInput);
    setLocationInput(postalCode);
    setUpdateLocation(false);
  };

  const handleInputChange = (event) => {
    setLocationInput(event.target.value);
  };

  useEffect(() => {
    // console.log('Updated postalCode:', postalCode);
    if (shouldNavigate && postalCode) {
      navigate(`/activities?p=${postalCode}`);
      setShouldNavigate(false); // Reset shouldNavigate to false after navigation
    }
  }, [postalCode, shouldNavigate]);

  return (
    <>
      <div className="">
        <Hero postcode={postalCode} />
        <div className="container">
          <div style={{textAlign:'center'}}>
            <h1 style={{ textAlign: 'center', marginBottom: 10 }}>Find popular events near {' '}
              {
                updateLocation ? (
                  <>
                    <TextField style={{ paddingLeft: 10 }} variant="standard" size="lg" onChange={handleInputChange} value={locationInput} />
                    <IconButton onClick={setNewPostalCode}>
                      <Check />
                    </IconButton>
                  </>
                ) : (
                  <>{postalCode} <IconButton onClick={updatePostalCode}><Edit /></IconButton></>
                )

              }
            </h1>

            <Button 
                variant="contained"
                onClick={() => handleLocationClick()}
                endIcon={<NearMe fontSize='small'/>}
                size="small"
              >
                Use Current Location
              </Button>
          </div>

        </div>

        <ActivityCategories postcode={postalCode} />
      </div>
    </>
  );
}
