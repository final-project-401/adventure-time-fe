import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, IconButton, TextField } from '@mui/material';
import { Check, Edit } from '@mui/icons-material';
import { NearMe } from '@mui/icons-material';
import ActivityCategories from '../Activities/categories';
import Hero from '../Hero';
import './style.css';

import { fetchLocation, updatePostalCode } from './actions';

export default function Main() {
  const dispatch = useDispatch();
  const postalCode = useSelector((state) => state.locationReducer.postalCode);

  const [updateLocation, setUpdateLocation] = useState(false);
  const [locationInput, setLocationInput] = useState('');

  useEffect(() => {
    dispatch(fetchLocation());
  }, [dispatch]);

  const handleLocationClick = () => {
    dispatch(fetchLocation());
  };

  // const handleNavigate = () => {
  //   navigate(`/activities?p=${postalCode}`);
  // };

  const updatePostalCodeHandler = () => {
    setUpdateLocation(true);
  };

  const setNewPostalCode = () => {
    dispatch(updatePostalCode(locationInput));
    setUpdateLocation(false);
  };

  const handleInputChange = (event) => {
    setLocationInput(event.target.value);
  };

  // useEffect(() => {
  //   if (postalCode && !requestingLocation) {
  //     handleNavigate();
  //   }
  // }, [postalCode, requestingLocation]);

  return (
    <>
      <div className="">
        <Hero postcode={postalCode} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ textAlign: 'center', marginBottom: 10 }}>
              Find popular events near{' '}
              {updateLocation ? (
                <>
                  <TextField
                    style={{ paddingLeft: 10 }}
                    variant="standard"
                    size="lg"
                    onChange={handleInputChange}
                    value={locationInput}
                  />
                  <IconButton onClick={setNewPostalCode}>
                    <Check />
                  </IconButton>
                </>
              ) : !postalCode 
                  ? (
                    <>
                    you <IconButton onClick={updatePostalCodeHandler}><Edit /></IconButton>
                    </>
                  ) 
                  : (
                      <>
                        {postalCode} <IconButton onClick={updatePostalCodeHandler}><Edit /></IconButton>
                      </>
                    )}
            </h1>

            <Button
              variant="contained"
              onClick={handleLocationClick}
              endIcon={<NearMe fontSize="small" />}
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
