// events.js (Events component)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Button, ButtonGroup, Snackbar, Grid } from '@mui/material';
import EventForm from '../EventForm';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list'
import { DeleteForever, Email } from '@mui/icons-material';
import Hero from '../Hero';

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
  

  const eventCreated = () => {
    setEventAdded(true);
  }

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
                        onClick={() => handleShareByEmail(event.id, 'recipient@example.com', 'sender@example.com', 'Check out this event!')}
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
