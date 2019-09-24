import React from 'react';
import './imageLinkForm.css';

const ImageLinkForm = () => {
  return (
    <div className='ma4 mt0'>
      <p className='f3 white'>
        {'Test the power of the Many Faced God to find a face in an image.'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input className='f4 pa2 w-70 center' type='tex' />
          <button className='w-30 grow f4 link ph3 pv2 dib white bg-green'>Detect</button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm;