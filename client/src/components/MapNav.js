import React, { Component } from 'react';

class MapNav extends Component {

  // TODO: Complete map shift logic (pass in more arguments as required);
  shiftMapView = direction => event => {
    event.preventDefault();
    console.log(direction);
  }

  render() {
    return (
      <div className="mapNavWrapper container">
        <div className="row">
          <button 
            className="btn btn-primary mapNavButton"
            onClick={this.shiftMapView("upperLeft")}
          >
            <span className="fas fa-chevron-left custom-fa-rotate-45"></span>
          </button>
          <button 
            className="btn btn-primary mapNavButton"
            onClick={this.shiftMapView("up")}
          >
            <span className="fas fa-chevron-up"></span>
          </button>
          <button 
            className="btn btn-primary mapNavButton"
            onClick={this.shiftMapView("upperRight")}
          >
            <span className="fas fa-chevron-up custom-fa-rotate-45"></span>
          </button>
        </div>
        <div className="row">
          <button 
            className="btn btn-primary mapNavButton"
            onClick={this.shiftMapView("left")}>
            <span className="fas fa-chevron-left"></span>
          </button>
          <button className="btn btn-primary mapNavButton">
            <span className="fas fa-crosshairs"></span>
          </button>
          <button 
          className="btn btn-primary mapNavButton"
          onClick={this.shiftMapView("right")}
          >
            <span className="fas fa-chevron-right"></span>
          </button>
        </div>
        <div className="row">
          <button 
            className="btn btn-primary mapNavButton" 
            onClick={this.shiftMapView("lowerLeft")}
          >
            <span className="fas fa-chevron-down custom-fa-rotate-45"></span>
          </button>
          <button 
            className="btn btn-primary mapNavButton"
            onClick={this.shiftMapView("down")}
          >
            <span className="fas fa-chevron-down"></span>
          </button>
          <button 
            className="btn btn-primary mapNavButton"
            onClick={this.shiftMapView("lowerRight")}
          >
            <span className="fas fa-chevron-right custom-fa-rotate-45"></span>
          </button>
        </div>        
      </div>
    );
  }
}

export default MapNav;
