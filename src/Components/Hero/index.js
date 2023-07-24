import React from 'react'
import StripWeather from '../Weather/stripWidget';

export default function Hero({postcode}) {
  console.log('postcode>>>', postcode);
  
  
  return (
    <>
      <div className="hero">
        <h1>Your next adventure starts here!</h1>
      </div>
      {postcode
          ? <div className='stripWeather'><StripWeather postcode={postcode}/> </div>
          : ''
        }
    </>
  )
}
