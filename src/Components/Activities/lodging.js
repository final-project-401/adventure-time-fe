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
import ShareIcon from '@mui/icons-material/Share';

function Lodging() {
  const [postalCode, setPostalCode] = useState('');
  const [updateLocation, setUpdateLocation] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [lodging, setLodging] = useState([]);

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

  const getLodging = async () => {
    if (postalCode) {
      let url = `${process.env.REACT_APP_SERVER}/rest?location=${postalCode}`;
      let dataFromAPI = await axios.get(url);
      setLodging(dataFromAPI.data);
    }
  };



  useEffect(() => {
    getLodging();
  }, [postalCode]); // Call getLodging() when postalCode changes


  return (
    <>
      <Hero postcode={postalCode} />
      <div className='container'>
          <h2>Yelp's Top Lodging near {' '}
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
          {lodging.map((lodging) => {
           return(
            <Grid key={lodging.id} item xs={6} sm={4} md={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}>
                <CardMedia
                  component="img"
                  height="194"
                  image={lodging.img ? lodging.img : 'https://placehold.co/600x400?text=image+not+available'}
                  alt={lodging.name}
                />
              <CardHeader
                style={{flexGrow:1}}
                action={lodging.price}
                title={lodging.name}
                subheader={`⭐️ ${lodging.rating}`}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <p>{lodging.address.join(', ')}</p>
                  <p>{lodging.displayPhone}</p>
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="Yelp Store Profile" onClick={() => window.open(lodging.yelpUrl)}>
                  <StoreMallDirectory />
                </IconButton>
                <IconButton aria-label="Call" onClick={() => window.open(`tel:${lodging.phone}`)}>
                  <PhoneIphone />
                </IconButton>
                <IconButton aria-label="share" style={{ marginLeft: 'auto' }}>
                  <ShareIcon />
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

export default Lodging;

