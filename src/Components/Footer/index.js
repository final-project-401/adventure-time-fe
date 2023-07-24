import React from 'react'
import './styling.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <>
      <footer>
        <div className='logos'>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-plain.svg" height='35px' alt='Facebook' />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height='35px' alt='GitHub' />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg" height='35px' alt='Twitter' />
        </div>
        <p className='address'>135 Trip St, Suite 4032 &bull; Seattle WA 98101 &bull; United States </p>
        <div className='icons'>
        <FontAwesomeIcon icon={faPhone} shake style={{color: "#4c4c4d"}} />
        <p className='phone'>&nbsp; + 123-456-789 &nbsp; &nbsp;</p>
        <FontAwesomeIcon icon={faEnvelope} shake style={{color: "#4c4c4d", marginTop: '2px'}} />
        <p> &nbsp; adventureTime@gmail.com</p>
        </div>

        <div>&copy;2023 AdventureTime</div>
      </footer>
    </>
  )
}

export default Footer