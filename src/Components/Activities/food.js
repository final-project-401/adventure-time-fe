import React, { useState, useEffect } from 'react';
import Hero from '../Hero';
import axios from 'axios';
import { Check, Edit, PhoneIphone, StoreMallDirectory } from '@mui/icons-material';
import { IconButton, TextField, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function Restaurants() {
  const [postalCode, setPostalCode] = useState('');
  const [updateLocation, setUpdateLocation] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('p');
    setPostalCode(code || '');
  }, []);

  const updatePostalCode = () => {
    setUpdateLocation(true);
  };

  const setNewPostalCode = () => {
    setPostalCode(locationInput);
    setUpdateLocation(false);
  };

  const handleInputChange = (event) => {
    setLocationInput(event.target.value);
  };

  const getRestaurants = async () => {
    if (postalCode) {
      let url = `${process.env.REACT_APP_SERVER}/food?location=${postalCode}`;
      let dataFromAPI = await axios.get(url);
      setRestaurants(dataFromAPI.data);
    }
  };



  useEffect(() => {
    getRestaurants();
  }, [postalCode]); // Call getRestaurants() when postalCode changes


  return (
    <>
      <Hero postcode={postalCode} />
      <div>
        <Link style={{textAlign:'start'}} to={'/'}>Home</Link> / Restaurants
      </div>
      <div className='container'>
       
          <h2>Yelp's highly-rated restaurants near {' '}
          {updateLocation ? (
            <>
              <TextField style={{ paddingLeft: 10 }} variant="standard" size="lg" onChange={handleInputChange} value={locationInput} />
              <IconButton onClick={setNewPostalCode}>
                <Check />
              </IconButton>
            </>
          ) : (
            <>
              {postalCode} <IconButton onClick={updatePostalCode}><Edit /></IconButton>
            </>
          )}</h2>
        <Grid container spacing={2}>
          {restaurants.map((restaurant) => {
           return(
            <Grid key={restaurant.id} item xs={6} sm={4} md={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}>
                <CardMedia
                  component="img"
                  height="194"
                  image={restaurant.img}
                  alt={restaurant.name}
                />
              <CardHeader
                style={{flexGrow:1}}
                action={restaurant.price}
                title={restaurant.name}
                subheader={`⭐️ ${restaurant.rating}`}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <p>{restaurant.address.join(', ')}</p>
                  <p>{restaurant.displayPhone}</p>
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="Yelp Store Profile" onClick={() => window.open(restaurant.yelpUrl)}>
                  <StoreMallDirectory />
                </IconButton>
                <IconButton aria-label="Call" onClick={() => window.open(`tel:${restaurant.phone}`)}>
                  <PhoneIphone />
                </IconButton>
               
              </CardActions>
                      </Card>
            </Grid>
           )
          })}
        </Grid>
      </div>


    </>
  );
}

export default Restaurants;

