// events.js (Events component)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Grid,
  CardHeader,
  CardActions
} from '@mui/material';
import EventForm from '../EventForm';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list'
import { DeleteForever } from '@mui/icons-material';
import { useAuth0 } from '@auth0/auth0-react';
import ShareIcon from '@mui/icons-material/Share';

import './style.css';


const Events = () => {
  const [events, setEvents] = useState([]);
  const [calEvent, setCalEvent] = useState([]);
  const [eventAdded, setEventAdded] = useState(false);
  const { user } = useAuth0();

  console.log(user);
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/planner`);
      setEvents(response.data);
      setEventAdded(false)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (events) {
      let eventData = events.map((x) => ({
        title: `${x.name} @ ${x.time}`,
        date: x.date.split('T')[0],
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
      await axios.delete(`${process.env.REACT_APP_SERVER}/planner/${eventId}`);
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleShareByEmail = async (event, user, text) => {
    try {
      await axios.get(`${process.env.REACT_APP_SERVER}/email`, {
        params: {
          receiver: event.travelBuddies,
          sender: user.email,
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
            <h3 style={{ marginTop: 10, marginBottom: 0 }}>Events this week</h3>
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
          <Grid item xs={12} sm={8} key={'card'}>
            <Grid container columns={12} spacing={2}>
              {events.map((event) => (
                <Grid item xs={12} sm={6} md={4} >
                <Card className='eCard' >
                  <CardHeader
                    title={event.name}
                    className='cardHeader'
                    style={{ paddingBottom: 0 }}
                  />
                  <CardContent style={{ paddingTop: 0 }} className='cardContent'>
                    <div className='subheader'>
                      <p>{event.date.split('T')[0]}</p>
                      <p>{event.time}</p>
                    </div>
                    {event.desc
                      ? <Typography variant="body2" color="text.secondary">
                        {event.desc}
                      </Typography>
                      : ''}
                    {/* <p>Things to bring: {event.packingList}</p> */}
                  </CardContent>
                  <CardActions disableSpacing className='cardActions'>
                    <IconButton aria-label="Delete Event" onClick={() => handleDelete(event.id)}>
                      <DeleteForever className='deleteButton' fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="share"
                      onClick={() => handleShareByEmail(event, user, `
                        <html>
                        <head>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    line-height: 1.6;
                                    background-color: #f0f0f0;
                                }
                                .event-container {
                                    padding: 20px;
                                    background-color: #ffffff;
                                    border: 1px solid #cccccc;
                                    border-radius: 5px;
                                }
                                .event-title {
                                    font-size: 24px;
                                    color: #333333;
                                }
                                .event-description {
                                    font-size: 16px;
                                    color: #666666;
                                }
                                .event-date-time {
                                    font-size: 14px;
                                    color: #999999;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="event-container">
                                <h2 class="event-title">Name: ${event.name}</h2>
                                <p class="event-description">Description: ${event.desc}</p>
                                <p class="event-date-time"> Date: ${event.date}and Time: ${event.time}</p>
                                <!-- Add more event details here -->
                            </div>
                        </body>
                    </html>
                `)}>
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
