import React from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
import apiKeys from './config/apiKeys';

const app = new Clarifai.App({
  apiKey: apiKeys.clarifaiAPIkey
});

const particlesOptions = {
  number: {
    value: 40,
    density: {
      enable: true,
      value_area: 800
    }
  }
}

function App() {
  let state = {
    input: '',
  }
  
  const onInputChange = (e) => {
    console.log(e.target.value);
  }

  const onSubmit = () => {
    console.log('you clicked me');
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
    function(response) {
      console.log(response);
    },
    function(err) {
      // there was an error
    }
  );
  }
  
  return (
    <div className="App">
      <Particles
        className='particles'
        params={{ polygon: {particlesOptions} }} 
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
        onInputChange={ onInputChange }
        onSubmit={ onSubmit }
      />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
