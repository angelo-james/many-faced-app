import React from 'react';
import Tilt from 'react-tilt';
import face from './face.png';
import './logo.css';

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner pa3" style={{ paddingTop: '20px' }}><img src={face} alt='face logo'/></div>
      </Tilt>
    </div>
  )
}

export default Logo;