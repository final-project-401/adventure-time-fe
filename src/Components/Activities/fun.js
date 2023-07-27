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

function Recreations() {
  const [postalCode, setPostalCode] = useState('');
  const [updateLocation, setUpdateLocation] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [recreations, setRecreations] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('p');
    setPostalCode(code || '');

    const getRecreations = async () => {
      if (postalCode) {
        let url = `${process.env.REACT_APP_SERVER}/play?location=${postalCode}`;
        let dataFromAPI = await axios.get(url);
        setRecreations(dataFromAPI.data);
      }
    };

    getRecreations();
  }, [postalCode]);

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

  return (
    <>
      <Hero postcode={postalCode} />
      <div>
        <Link style={{textAlign:'start'}} to={'/'}>Home</Link> / Activities
      </div>
      <div className='container'>
          <h2>Yelp's highly-rated Bars &amp; Activities near {' '}
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
          {recreations.map((recreation) => {
           return(
            <Grid key={recreation.id} item xs={6} sm={4} md={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}>
                <CardMedia
                  component="img"
                  height="194"
                  image={recreation.img ? recreation.img : 'https://placehold.co/600x400?text=image+not+available'}
                  alt={recreation.name}
                />
              <CardHeader
                style={{flexGrow:1}}
                action={recreation.price}
                title={recreation.name}
                subheader={`⭐️ ${recreation.rating}`}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <p>{recreation.address.join(', ')}</p>
                  <p>{recreation.displayPhone}</p>
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="Yelp Store Profile" onClick={() => window.open(recreation.yelpUrl)}>
                  <StoreMallDirectory />
                </IconButton>
                <IconButton aria-label="Call" onClick={() => window.open(`tel:${recreation.phone}`)}>
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

export default Recreations;

