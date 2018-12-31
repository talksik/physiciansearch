import React, { Component } from 'react';
import logo from './logo.svg';
import enter from './images/enter.png';

import './App.css';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyBLYp4CH1DV_xZHvxtQ5GjaQU4A6gaUzSE");

// centering in the US
const initialState = {
    name: '',
    lat: 39.8283,
    lng: -98.57,
    error: false
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  // Sets the state as user is typing in the name of the physician
  updateName = (e) => {
    var newState = this.state;
    newState['name'] = e.target.value;

    this.setState(newState);
  }

  // Connection to the separated backend server => DB
  // endpoint: https://physiciansearch.herokuapp.com/
  // local: http://localhost:3000
  search = (e) => {
    // get request to backend REST API
    axios.get(`https://physiciansearch.herokuapp.com/physicianloc`, {
        params: {
          name: this.state.name
        }
      })
      .then(res => {
        // received data
        const physician = res.data;
        console.log(physician);
        const address = physician.address + ', ' + physician.city + ' ' + physician.state + ' ' + physician.zip_code.toString();

        // Convert address to lat and lng for our frontend map API
        // Uses Google's API Geocode to convert
        Geocode.fromAddress(address).then(
          response => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log(lat, lng);
            this.setState({
              lat: lat,
              lng: lng,
              error: false
            });
          },
          error => {
            console.error(error);
          }
        );
      }, err => {
        console.log('Could not find physician');
        // make the error box appear
        this.setState({
          error: true
        });
      });
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

          {name.length === 0 ?
            null
            :
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

        {this.state.error ?
          <div className="error">Could not find physician!</div>
          :
          null
        }
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBLYp4CH1DV_xZHvxtQ5GjaQU4A6gaUzSE')
})(App);
