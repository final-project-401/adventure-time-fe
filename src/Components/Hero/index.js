import React from 'react'
import StripWeather from '../Weather/stripWidget';
// import Header from '../Header';

export default function Hero({postcode}) {
  console.log('postcode>>>', postcode);
  
  
  return (
    <>
      <div className="hero">
      {/* <Header /> */}
        <h1>Your next adventure starts here!</h1>
      </div>
      
      {postcode
          ? <div className='stripWeather'><StripWeather postcode={postcode}/> </div>
          : ''
        }
    </>
  )
}
