// events.js (Events component)
import React, { useState  } from 'react';
import axios from 'axios';
import {  Button, TextField,  Grid } from '@mui/material';



const EventForm = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');
  const [travelBuddies, setTravelBuddies] = useState('');
  const [time, setTime] = useState('');
  const [events, setEvents] = useState([]); // Ensure 'events' is initialized as an empty array

  const handleCreate = async () => {
    try {
      const newEvent = {
        name,
        desc,
        date,
        travelBuddies,
        time,
        userId: 1,
      };
      const response = await axios.post('http://localhost:4001/planner', newEvent);
      setEvents([...events, response.data]);
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div>
    <Grid container>
      <Grid item xs={12}>
        <TextField
          size="small"
          label="Event Name"
          variant="standard"
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          size="small"
          label="Description"
          variant="standard"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          margin="normal"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          size="small"
          label="Date"
          type="date"
          variant="standard"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          size="small"
          label="Time"
          variant="standard"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 minute increments
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          size="small"
          label="Travel Buddies"
          variant="standard"
          value={travelBuddies}
          onChange={(e) => setTravelBuddies(e.target.value)}
          margin="normal"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button size='small' variant="contained" color="primary" onClick={handleCreate}>
          Create Event
        </Button>
      </Grid>
    </Grid>
    </div>
  );
};

export default EventForm;
