import React, { Component } from 'react';
import MapNav from './components/MapNav';
import Sidebar from './components/Sidebar';

class App extends Component {
  render() {
    return (
      <div>
        <div><MapNav /></div>
        <div><Sidebar /></div>
      </div>
    );
  }
}

export default App;
