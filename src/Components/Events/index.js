// events.js (Events component)
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Card, CardContent, Button, ButtonGroup, Snackbar, Grid } from '@mui/material';
import EventForm from '../EventForm';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list'
import { DeleteForever, Email } from '@mui/icons-material';
import Hero from '../Hero';
import { useAuth0 } from '@auth0/auth0-react';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [calEvent, setCalEvent] = useState([]);
  const [eventAdded, setEventAdded] = useState(false);
  const { user, isAuthenticated } = useAuth0();

  console.log(user);
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3001/planner');
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
        date: x.date,
      }));
      setCalEvent(eventData);
    }
  }, [events]);

  console.log('calEvent>>>', calEvent);


  const eventCreated = () => {
    setEventAdded(true);
  }

  useEffect(() => {
    fetchEvents();
  }, [eventAdded]);

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:3001/planner/${eventId}`);
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleShareByEmail = async (event, user, text) => {
    try {
      await axios.get('http://localhost:3001/email', {
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
      <Hero />
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
          <Grid item xs={12} sm={6}>
            <div>
              {events.map((event) => (
                <Card key={event.id}>
                  <CardContent>
                    <h2>{event.name}</h2>
                    <p style={{ margin: '5px 0' }}>{event.desc}</p>
                    <p style={{ margin: '5px 0' }}>Date: {event.date}</p>
                    <p style={{ margin: '5px 0' }}>Travel Buddies: {event.travelBuddies}</p>
                    <p style={{ margin: '5px 0' }}>Time: {event.time}</p>
                    <ButtonGroup style={{ marginTop: 10 }} size="small" aria-label="small button group">
                      <Button variant="contained" color="secondary" onClick={() => handleDelete(event.id)}>
                        <DeleteForever fontSize="small" />
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
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
                `)}
                      >
                        <Email fontSize="small" />
                      </Button>
                    </ButtonGroup>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Grid>
        </Grid>

      </div>
    </>
  );
};

export default Events;
