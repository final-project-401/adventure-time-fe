import React from 'react'

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




