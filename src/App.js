import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
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

class App extends Component {
  state = {
    input: '',
    imageUrl: '',
  }
  
  onInputChange = (e) => {
    this.setState({ input: e.target.value });
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
    function(response) {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      // there was an error
    }
  );
  }
  render() {
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
          onInputChange={ this.onInputChange }
          onSubmit={ this.onSubmit }
        />
        <FaceRecognition 
          imageUrl={this.state.imageUrl}
        />
      </div>
    );
  }
}

export default App;
