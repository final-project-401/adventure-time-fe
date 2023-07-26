// import React, { useEffect, useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import listPlugin from '@fullcalendar/list';
// import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
// import axios from 'axios';
// import Grid from '@mui/material/Grid';
// import { Container } from '@mui/material';

// function Calendar() {
//   const [res, setRes] = useState({});
//   const [events, setEvents] = useState([]);
//   const [weatherRes, setWeatherRes] = useState([]);
//   const [weather, setWeather] = useState([]);

//   useEffect(() => {
//     const getEvents = async () => {
//       try {
//         let url = 'http://localhost:3001/planner';
//         let eventData = await axios.get(url);
//         setRes(eventData);
//       } catch (error) {
//         console.error(error || error.message);
//       }
//     };

//     getEvents();
//   }, []);

//   useEffect(() => {
//     const getWeather = async () => {
//       try {
//         let url = 'http://localhost:3001/forecast'
//         let weatherData = await axios.get(url);
//         setWeatherRes(weatherData);
//       } catch (error) {
//         console.error(error || error.message);        
//       }
//     };
//     getWeather()
//   }, [])

//   useEffect(() => {
//     if (weatherRes.data){
//       let weatherData = weatherRes.data.map((x) => ({
//         title: x.temp,
//         date: x.date
//       }));
//       setWeather(weatherData);
//     }
//   }, [weatherRes.data]);

//   const formatDate = (date) => {
//     date = date.toString();
//     let year = date.split('').splice(0, 4).join('');
//     let month = date.split('').splice(4, 2).join('');
//     let day = date.split('').slice(-2).join('');

//     return `${year}-${month}-${day}`;
//   };

//   useEffect(() => {
//     if (res.data) {
//       let eventData = res.data.map((x) => ({
//         title: x.name,
//         date: formatDate(x.date),
//       }));
//       setEvents(eventData);
//     }
//   }, [res.data]);

//   console.log('events>>>', events);

//   const screenWidth = () => {
//     let width = window.innerWidth;
//     let breakpoint ='';

//     switch (true) {
//       case width < 600:
//         breakpoint = 'xs';
//         break;
//       case width < 900:
//         breakpoint = 'sm';
//         break
//       case width < 1200:
//         breakpoint = 'md';
//         break
//       case width < 1536:
//         breakpoint = 'lg';
//         break
//       default: 
//         breakpoint = 'xl'
//     }

//     return `${width}px ${breakpoint}`
//   }

 


//   return (

//     <>
//     <h1>Your Weekly view</h1>
//       <h6>{screenWidth()}</h6>
//         <Grid container spacing={2} style={{width:'95%', margin:'0 auto'}}>
//           <Grid item xs={12} lg={7}>
//             <FullCalendar
//               plugins={[listPlugin]}
//               initialView="listWeek"
//               headerToolbar={{
//                 left: '',
//                 center: '',
//                 right: '',
//                 }}
//               footerToolbar={{
//                 left: 'prev,next',
//                 center: '',
//                 right: '',
//               }}
//               events={events}
//             />
//           </Grid>
//           <Grid item xs={12} lg={5}>
//             <FullCalendar
//                 plugins={[ dayGridPlugin ]}
//                 initialView="dayGridMonth"
//                 headerToolbar={{
//                 left: '',
//                 center: '',
//                 right: '',
//                 }}
//                 events={weather}
//             />
//           </Grid>
//         </Grid>
//     </>
//   );
// }


// export default Calendar;
