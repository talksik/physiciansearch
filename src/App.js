import React, { Component } from 'react';
import logo from './logo.svg';
import enter from './images/enter.png';

import './App.css';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


const initialState = {
    name: '',
    lat: 39.8283,
    lng: -98.57
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  updateName = (e) => {
    var newState = this.state;
    newState['name'] = e.target.value;

    this.setState(newState);
  }

  // Look for person's lat and lng in imported dataset
  search = (e) => {
    var newLoc = this.state;
    newLoc['lat'] = 0;
    newLoc['lng'] = 0;
    this.setState(newLoc);
  }

  render() {
    const {name, lat, lng} = this.state;

    return (
      <div className="App flexBasicCol">
        <div className="search flexBasicRow">
          <input
            placeholder="enter physician name"
            className="stdInput"
            onChange={this.updateName}
          />

          {name.length === 0 ? null :
            <img src={enter} className="enterIcon" onClick={this.search} />
          }
        </div>

        <div className="map">
          <Map
            google={this.props.google}
            zoom={4}
            initialCenter={{
              lat: lat,
              lng: lng
              }}
            center={{
              lat: lat,
              lng: lng
              }}
            onClick={this.onMapClicked}
          >
          {lat === initialState.lat ? null :
            <Marker
              onClick={this.onMarkerClick}
              name={name}
              position={{
                lat: lat,
                lng: lng
                }}
            />
          }
          </Map>
        </div>
      </div>
    );
  }
}

// <header className="App-header">
//   <img src={logo} className="App-logo" alt="logo" />
//   <p>
//     Edit <code>src/App.js</code> and save to reload.
//   </p>
//   <a
//     className="App-link"
//     href="https://reactjs.org"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     Learn React
//   </a>
// </header>

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBLYp4CH1DV_xZHvxtQ5GjaQU4A6gaUzSE')
})(App)
