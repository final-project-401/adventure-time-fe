// events.js (Events component)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Card, 
  CardContent, 
  IconButton, 
  Typography, 
  Grid, 
  CardHeader, 
  CardActions} from '@mui/material';
import EventForm from '../EventForm';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list'
import { DeleteForever } from '@mui/icons-material';
import ShareIcon from '@mui/icons-material/Share';
// import { makeStyles } from '@mui/styles';

import './style.css';


const Events = () => {
  const [events, setEvents] = useState([]);
  const [calEvent, setCalEvent] = useState([]);
  const [eventAdded, setEventAdded] = useState(false);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:4001/planner');
      setEvents(response.data);
      setEventAdded(false)
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (date) => {
    date = date.toString();
    let year = date.split('').splice(0, 4).join('');
    let month = date.split('').splice(5, 2).join('');
    let day = date.split('').slice(-2).join('');

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (events) {
      let eventData = events.map((x) => ({
        title: x.name,
        date: formatDate(x.date),
      }));
      setCalEvent(eventData);
    }
  }, [events]);

  console.log('calEvent>>>', calEvent);


  useEffect(() => {
    fetchEvents();
  }, [eventAdded]);

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:4001/planner/${eventId}`);
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleShareByEmail = async (eventId, receiverEmail, senderEmail, text) => {
    try {
      await axios.get('/email', {
        params: {
          receiver: receiverEmail,
          sender: senderEmail,
          text,
        },
      });
      console.log('Email sent');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="hero2">
        <h1>Your private events!</h1>
      </div>
      <div className='container'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <EventForm />
            <h3 style={{ marginTop: 20, marginBottom: 0 }}>Events this week</h3>
            <FullCalendar
              plugins={[listPlugin]}
              initialView="listWeek"
              headerToolbar={{
                left: '',
                center: '',
                right: '',
              }}
              events={calEvent}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Grid container columns={12} spacing={2}>
              {events.map((event) => (
                <Grid item xs={6} md={4} >
                  <Card className='eCard'>
                    <CardHeader
                      title={event.name}
                      className='cardHeader'
                      style={{paddingBottom: 0}}
                    />
                    <CardContent style={{paddingTop:0}} className='cardContent'>
                      <div className='subheader'>
                        <p>{event.date} {event.time}</p>
                        <p>{event.time}</p>
                      </div>
                      {event.desc
                        ? <Typography variant="body2" color="text.secondary">
                          {event.desc}
                        </Typography>
                        : ''}
                    </CardContent>
                    <CardActions disableSpacing className='cardActions'>
                      <IconButton aria-label="Delete Event" onClick={() => handleDelete(event.id)}>
                        <DeleteForever className='deleteButton' fontSize="small" />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon fontSize="small" />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

      </div>
    </>
  );
};



export default Events;
