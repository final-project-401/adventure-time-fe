import React from 'react'
import { Form } from 'react-router-dom'

function EventForm() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }
  return (
    <>

    <div>EventForm</div>
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
    </>
  );

}



export default EventForm




