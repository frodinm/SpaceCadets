import React, { Component } from 'react';
import Axios from 'axios';
import logo from './logo.svg';
import './App.css';

const baseURL = "http://localhost:5000";

class App extends Component {
  constructor(){
    super();

    Axios.request({
      baseURL,
      method: 'post',
      url: "/member/register",
      data:{
        name: 'Fabrizio RM',
        profession: 'Coder',
        birthday: '11 January 1997',
        gender: 'Male',
        location: { longitude: 100, latitude: 150},
      }
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
