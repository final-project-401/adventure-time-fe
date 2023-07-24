import React from 'react'

function EventForm() {
  return (
    <div>EventForm</div>
  )
}

export default EventForm

function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}