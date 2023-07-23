import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { Box, Card, Container, Icon, Paper } from '@mui/material';
import { LocationCity, PlaceRounded } from '@mui/icons-material';
import './style.css';
import { getWeatherIcon } from './getWeatherIcon';

function Weather() {
  const [weatherRes, setWeatherRes] = useState([]);
  const [location, setLocation] = useState('');
  const [forecast, setForecast] = useState([]);
  const [todaysData, setTodaysData] = useState([]);
  const [postalCode, setPostalCode] = useState('');

  useEffect(() => {

    const getPostalCode = async() => {
      let userUrl = `${process.env.REACT_APP_SERVER}/users`
      let userData = await axios.get(userUrl);
      setPostalCode(userData.data[0].zipCode)
    };
   

    const getWeather = async () => {
      try {
        const url = `${process.env.REACT_APP_SERVER}/forecast?postal_code=${postalCode}`;
        console.log('url>>>', url);
        const weatherData = await axios.get(url);
        setWeatherRes(weatherData.data);
        const weather = weatherData.data; 
        setLocation(`${postalCode}, ${weather[0].state}`);
        setTodaysData(weather[0].data[0]);
        const forecastData = [...weather[0].data];
        forecastData.shift();
        setForecast(forecastData);
      } catch (error) {
        console.error(error.message || error); 
      }
    };

    getPostalCode();
    getWeather();

  }, []);

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
    const month = parseInt(dateArr[1]);
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

  console.log('postalCode>>>', weatherRes);
  
  

  const date = todaysData ? formatDate(todaysData.date) : null;

  return (
    <>
      <div className='card'>
        <Container className="current glass">
          <div className="header">
            <p className='caps curDate'>{`${date.dayOfWeek}, ${date.todayM} ${date.todayD}`}</p>
            <p className='city'>{location}</p>
          </div>

          <div className="content">
            {/* Left Content */}
            <div className='main'>
              <div className=''>
                <div className="row">
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

        <Grid container rowSpacing={3} className="forecastWeather glass">
          {forecast.map((day) => {
            const formattedDate = day ? formatDate(day.date) : null;
            return (
              <Grid item xs={4} md={4} key={day.id}>
                <p className='date'>{`${formattedDate.dayOfWeek.slice(0, 3)}, ${formattedDate.todayM.slice(0,3)} ${formattedDate.todayD}`}</p>
                <img src={getWeatherIcon(day.weatherCode, day.icon)} alt='icon' width={75} />
                <p>{day.description}</p>
                <p>High: {day.high_temp}&deg; F</p>
                <p>Low: {day.low_temp}&deg; F</p>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
}

export default Weather;
