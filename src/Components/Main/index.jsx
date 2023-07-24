import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { NearMe } from '@mui/icons-material';
import axios from 'axios';

import './style.css';
import StripWeather from '../Weather/stripWidget'
import Hero from '../Hero';

export default function Main() {

  const navigate = useNavigate();

  const [location, setLocation] = useState({});
  const [postalCode, setPostalCode] = useState('');
  const [postalCodeInput, setPostalCodeInput] = useState('');
  const [shouldNavigate, setShouldNavigate] = useState(false); // New state to track navigation

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

  const handleLocationClick = () => {
    getGeoLocation();
    getPostalCode(location.lat, location.lon);
  }

  async function getPostalCode(lat, lon) {
    let apiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    let dataFromAPI = await axios.get(apiUrl);

    setPostalCode(dataFromAPI.data.postcode)
  }

  const handleNavigate = () => {
    // navigate('/activities', { postalCode })
    setShouldNavigate(true); // Set shouldNavigate to true to trigger navigation
  }

  const handleSearchClick = async (params) => {
    setPostalCode(params);
    console.log(postalCode);
    handleNavigate();
  }

  useEffect(() => {
    console.log('Updated postalCode:', postalCode);
    if (shouldNavigate && postalCode) {
      navigate(`/activities?p=${postalCode}`);
      setShouldNavigate(false); // Reset shouldNavigate to false after navigation
    }
  }, [postalCode, shouldNavigate]);

  return (
    <>
      <button onClick={() => handleNavigate()}>LESSGO!</button>
      <div className="">
       <Hero postcode={postalCode}/>

        
        <div className="container">
          <div>
            <h1 style={{ textAlign: 'center' }}>Find popular events near you </h1>
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '75%', margin: '0 auto' }}
            >
              <InputBase
                onChange={(event) => setPostalCodeInput(event.target.value)}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Enter your Postal Code"
              />
              <IconButton
                onClick={() => handleSearchClick(postalCodeInput)}
                type="button"
                sx={{ p: '10px' }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton
                color="primary"
                sx={{ p: '10px' }}
                aria-label="geolocator"
                onClick={() => handleLocationClick()}
              >
                <NearMe />
              </IconButton>
            </Paper>
          </div>

        </div>
      </div>
    </>
  );
}
