import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import { getWeatherIcon } from './getWeatherIcon';

import './stripWidget.css';

function Weather({ postcode }) {
  const [location, setLocation] = useState('');
  const [forecast, setForecast] = useState([]);
  const [todaysData, setTodaysData] = useState([]);

  console.log('postcode params>>>', postcode);


  useEffect(() => {

    const getWeather = async () => {
      try {
        const url = `${process.env.REACT_APP_SERVER}/forecast?postal_code=${postcode}`;
        console.log('url>>>', url);
        const weatherData = await axios.get(url);
        const weather = weatherData.data;

        setLocation(`${postcode}, ${weather[0].state}`);
        setTodaysData(weather[0].data[0]);

        const forecastData = [...weather[0].data];
        setForecast(forecastData);

      } catch (error) {
        console.error(error.message || error);
      }
    };

    if (postcode) {
      getWeather();
      
    }

  }, [postcode]);

  const formatDate = (date) => {
    if (!date) {
      return {
        dayOfWeek: '',
        todayM: '',
        todayD: '',
        todayY: '',
      };
    }

    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };

    const dateArr = date.split('-');
    let month = parseInt(dateArr[1]);
    month -= 1;
    const day = parseInt(dateArr[2]);
    const year = parseInt(dateArr[0]);

    const today = new Date(year, month, day);
    const formattedDate = today.toLocaleString('en-US', options);

    const dayOfWeek = formattedDate.split(', ')[0];
    const todayM = formattedDate.split(' ')[1];
    const todayD = formattedDate.split(' ')[2].split(',')[0];
    const todayY = formattedDate.split(', ')[2];

    return { dayOfWeek, todayM, todayD, todayY };
  };

  console.log(todaysData);

  console.log('location>>>', location);

  return (
    <>
        <Container className="forecastWeather" key={'forecast'}>
          <div className='cardStrip glass' key={'div'}>

          <Grid container columns={{xs:12, sm:7}} rowSpacing={3} key={'grid'}>
            {forecast.map((day) => {
              const formattedDate = day ? formatDate(day.date) : null;
              return (
                <Grid item xs={3} sm={1} key={day.id}>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p className='date'>{`${formattedDate.dayOfWeek.slice(0, 3)}, ${formattedDate.todayM.slice(0, 3)} ${formattedDate.todayD}`}</p>
                    <img src={getWeatherIcon(day.weatherCode, day.icon)} alt='icon' width={75} />
                    
                      <p style={{ textAlign: 'center' }}>{day.description}</p>
                    {/* Hidden on medium/small screens */}
                    <div className="hide-on-medium-down">
                      <p>High: {day.high_temp}&deg; F</p>
                      <p className='low'>Low: {day.low_temp}&deg; F</p>
                    </div>
                  </div>
                </Grid>
              );
            })}
          </Grid>
            <p style={{marginTop:16, textAlign:'right'}}>7-Day weather forecast for {postcode} brought to you by WeatherBit.io</p>
         </div>
        </Container>
    </>
  );
}

export default Weather;
