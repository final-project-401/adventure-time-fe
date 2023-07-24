import React, { useState } from 'react';
import { TextInput } from '@mantine/core';
import { Button } from '@mantine/core';
import axios from 'axios';
import NearMeIcon from '@mui/icons-material/NearMe';


import './style.css';
import Weather from '../Weather';

export default function Main() {
  const [location, setLocation] = useState({});
  const [locationCity, setlocationCity] = useState('your area');

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, err);
    } else {
      // alert('Geolocation not supported');
      console.log('Geolocation not supported');
    }
  }

  const success = (position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    setLocation({ lat, lon });
    getCityName();
    console.log('Latitude', lat, 'Longitude', lon);
  };

  const err = () => {
    console.log('Unable to retrieve location.')
  };

  console.log('location.lat>>>', location.lat);

  async function getCityName(lat, lon) {
    lat = location.lat;
    lon = location.lon;
    let url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    let getCityUrl = await axios.get(url)
    setlocationCity(`${getCityUrl.data.city}, ${getCityUrl.data.countryCode}`)
    console.log(getCityUrl.data)
  }

  return (
    <>
      <div className="">
        <div className="hero">
          <h1>Your next adventure starts here!</h1>
        </div>

        <div className="container">
          <div>
            <h1>Find popular events in {locationCity}</h1>
            <TextInput
              placeholder="Enter your zipcode to begin your next adventure"
              size='xl'
              rightSection={
                <Button size='xl' onClick={() => handleLocationClick()} leftIcon={<NearMeIcon size="1rem" />} />
              } />
          </div>
          <div className="restaraunts">
            <ul>
              <li>restaraunts will pop up in here</li>
            </ul>
          </div>
        </div>
      </div>
      {/* <Weather /> */}
    </>
  )
}