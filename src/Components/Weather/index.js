import axios from 'axios';

import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Card, Container, Icon, Paper } from '@mui/material';
import './style.css';
import { LocationCity, PlaceRounded } from '@mui/icons-material';

function Weather() {
  const [weatherRes, setWeatherRes] = useState([]);
  const [weather, setWeather] = useState([]);
  const [location, setLocation] = useState('');
  const [forecast, setForecast] = useState([]);
  const [todaysData, setTodaysData] = useState([]); 

  useEffect(() => {
    const getWeather = async () => {
      try {
        let url = 'http://localhost:4001/forecast';
        let weatherData = await axios.get(url);
        setWeatherRes(weatherData.data);
      } catch (error) {
        console.error(error || error.message);
      }
    };

    // location = `${weather[0].city}, ${weather[0].state}`;
  // todaysData = weather[0].data[0];
  
  // forecast = weather[0].data
  // forecast.shift();
  
    if (weatherRes.data) {
      setWeather(weatherRes.data);
      setLocation(`${weather[0].city}, ${weather[0].state}`);
      setTodaysData(weather[0].data[0])
      setForecast((weather[0].data).shift());

      console.log('forecast>>>', forecast);
      
    } else {
      getWeather();
    }
  }, [weatherRes.data]);
  

  const screenWidth = () => {
    let width = window.innerWidth;
    let breakpoint = '';

    switch (true) {
      case width < 600:
        breakpoint = 'xs';
        break;
      case width < 900:
        breakpoint = 'sm';
        break
      case width < 1200:
        breakpoint = 'md';
        break
      case width < 1536:
        breakpoint = 'lg';
        break
      default:
        breakpoint = 'xl'
    }

    return `${width}px ${breakpoint}`
  }

  // console.log(weather)
  // location = `${weather[0].city}, ${weather[0].state}`;
  // todaysData = weather[0].data[0];
  
  // forecast = weather[0].data
  // forecast.shift();
  console.log('todaysData>>>', forecast);
  

  const formatDate = (date, timezone) => {
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }

    let dateArr = date.split('-');
    let month = parseInt(dateArr[1]);
    let day = parseInt(dateArr[2]);
    let year = parseInt(dateArr[0]);

    let today = new Date(year, month, day);


    let formattedDate = today.toLocaleString('en-US', options)


    let dayOfWeek = formattedDate.split(', ')[0];
    let todayM = formattedDate.split(' ')[1];
    let todayD = formattedDate.split(' ')[2].split(',')[0];
    let todayY = formattedDate.split(', ')[2];


    return { dayOfWeek, todayM, todayD, todayY }

  }




  // let date = todaysData ? formatDate(todaysData.date, weather[0].timezone) : null;

  // console.log('todaysData>>>', date.dayOfWeek);









  return (

    <>
      <h6>{screenWidth()}</h6>
      <div className='card'>
        <Container className="current glass">

          <div className="header">
            {/* <p className='caps curDate'>{`${date.dayOfWeek}, ${date.todayM} ${date.todayD}`}</p> */}
            <p className='city'>{location}</p>
          </div>

          <div className="content">
            <div className='left'>
              <div className=''>
                <div className="row">
                  <img src={todaysData.iconPath} alt='icon' width={75} />
                  <p className='temp'> {todaysData.temp}&deg; F</p>
                </div>
                <p className='desc'>{todaysData.description}</p>
                <div className='highLow'>
                  <p>High: {todaysData.high_temp}&deg; F</p>
                  <p>Low: {todaysData.low_temp}&deg; F</p>
                </div>
              </div>
            </div>
            {/* <div style={{ width: '20%' }}>
              <div className='row'>
                <p>UV Index</p>
                <p>5.7 of 10</p>
              </div>
              <div className='row'>
                <p>Wind</p>
                <p>SW 6.5 mph</p>
              </div>
              <div className='row'>
                <p>Humidity (rh)</p>
                <p>79%</p>
              </div>
              <div className='row'>
                <p>Pressure</p>
                <p>1000.1 mb</p>
              </div>
              <div className='row'>
                <p>Precipitation</p>
                <p>5.7 of 10</p>
              </div>
            </div> */}
          </div>

        </Container>
        <div className="forecastWeather glass">
          <div className='daily'>
            <p className='date'>Sat</p>
            <img src='https://cdn.weatherbit.io/static/img/icons/c03d.png' alt='icon' width={75}/>
            <p className='high'>High: 80&deg; F</p>
            <p className='low'>Low: 80&deg; F</p>
          </div>
          <div className='daily'>
            <p className='date'>Sat</p>
            <img src='https://cdn.weatherbit.io/static/img/icons/c03d.png' alt='icon' width={75}/>
            <p className='high'>High: 80&deg; F</p>
            <p className='low'>Low: 80&deg; F</p>
          </div>
          <div className='daily'>
            <p className='date'>Sat</p>
            <img src='https://cdn.weatherbit.io/static/img/icons/c03d.png' alt='icon' width={75}/>
            <p className='high'>High: 80&deg; F</p>
            <p className='low'>Low: 80&deg; F</p>
          </div>
          <div className='daily'>
            <p className='date'>Sat</p>
            <img src='https://cdn.weatherbit.io/static/img/icons/c03d.png' alt='icon' width={75}/>
            <p className='high'>High: 80&deg; F</p>
            <p className='low'>Low: 80&deg; F</p>
          </div>
          <div className='daily'>
            <p className='date'>Sat</p>
            <img src='https://cdn.weatherbit.io/static/img/icons/c03d.png' alt='icon' width={75}/>
            <p className='high'>High: 80&deg; F</p>
            <p className='low'>Low: 80&deg; F</p>
          </div>
          <div className='daily'>
            <p className='date'>Sat</p>
            <img src='https://cdn.weatherbit.io/static/img/icons/c03d.png' alt='icon' width={75}/>
            <p className='high'>High: 80&deg; F</p>
            <p className='low'>Low: 80&deg; F</p>
          </div>
          
        </div>



      </div>
    </>
  );
}


export default Weather;




