import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
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
    box: {},
    route: 'signin'
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }
  
  onInputChange = (e) => {
    this.setState({ input: e.target.value });
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="App">
        <Particles
          className='particles'
          params={{ polygon: {particlesOptions} }} 
        />
        <Navigation />
        { this.state.route === 'signin' ? 
          <SignIn /> :
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm 
              onInputChange={ this.onInputChange }
              onSubmit={ this.onSubmit }
            />
            <FaceRecognition 
              imageUrl={this.state.imageUrl}
              box={this.state.box}
            />
          </div>
        }
      </div>
    );
  }
}

export default App;
