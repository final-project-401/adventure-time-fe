import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { Container, } from '@mui/material';
import './style.css';
import { getWeatherIcon } from './getWeatherIcon';

function Weather({ postcode }) {
  // const [weatherRes, setWeatherRes] = useState([]);
  const [location, setLocation] = useState('');
  const [forecast, setForecast] = useState([]);
  const [todaysData, setTodaysData] = useState([]);
  // const [postalCode, setPostalCode] = useState('');

  // postcode = 98032;

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
        forecastData.shift();
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
    month -= 1 //month values start at 0 for January and ends at 11 for December
    let day = parseInt(dateArr[2]);
    let year = parseInt(dateArr[0]);
    const today = new Date(year, month, day);
    
    const formattedDate = today.toLocaleString('en-US', options);
    const dayOfWeek = formattedDate.split(', ')[0];
    const todayM = formattedDate.split(' ')[1];
    const todayD = formattedDate.split(' ')[2].split(',')[0];
    const todayY = formattedDate.split(', ')[2];

    return { dayOfWeek, todayM, todayD, todayY };
  };

  const date = todaysData ? formatDate(todaysData.date) : null;

  return (
    <>
      <div className='card glass'>
        <Container className="current" key={'current'}>
          <div className="header">
            <p className='caps curDate'>{`${date.dayOfWeek}, ${date.todayM} ${date.todayD}`}</p>
            <p className='city'>{location}</p>
          </div>

          <div className="content" key={todaysData.date}>
            {/* Left Content */}
            <div className='main'>
              <div className=''>
                <div style={{display: 'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                  <img src={getWeatherIcon(todaysData.weatherCode, todaysData.icon)} alt='icon' width={75} />
                  <p className='temp'> {todaysData.temp}&deg; F</p>
                </div>
                <p className='desc'>{todaysData.description}</p>
                <div className='highLow'>
                  <p>High: {todaysData.high_temp}&deg; F</p>
                  <p>Low: {todaysData.low_temp}&deg; F</p>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className='addnl'>
              <div className='row'>
                <p>UV Index</p>
                <p>{todaysData.uvIndex} of 10</p>
              </div>
              <div className='row'>
                <p>Wind</p>
                <p>{`${todaysData.windDir} ${todaysData.windSpd}`} mph</p>
              </div>
              <div className='row'>
                <p>Humidity (rh)</p>
                <p>{todaysData.humidity}%</p>
              </div>
              <div className='row'>
                <p>Pressure</p>
                <p>{todaysData.pressure} mb</p>
              </div>
              <div className='row'>
                <p>Chance of Rain</p>
                <p>{todaysData.pop}%</p>
              </div>
            </div>
          </div>
        </Container>
        <Container className="forecastWeather" key={'forecast'}>
          <Grid container rowSpacing={3}>
            {forecast.map((day) => {
              const formattedDate = day ? formatDate(day.date) : null;
              return (
                <Grid item xs={4} key={day.id}>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p className='date'>{`${formattedDate.dayOfWeek.slice(0, 3)}, ${formattedDate.todayM.slice(0, 3)} ${formattedDate.todayD}`}</p>
                    <img src={getWeatherIcon(day.weatherCode, day.icon)} alt='icon' width={75} />
                    <p style={{ textAlign: 'center' }}>{day.description}</p>
                    <p>High: {day.high_temp}&deg; F</p>
                    <p>Low: {day.low_temp}&deg; F</p>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default Weather;
