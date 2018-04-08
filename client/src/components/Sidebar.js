import React, { Component } from 'react';

class Sidebar extends Component {
  constructor() {
    super();
    this.state = { 
      collapsed: true }
  }

  toggleCollapse = event => {
    this.setState(st => { return { 
      collapsed: !st.collapsed }
    });
  } 

  renderCollapsed = () => {
    return (
      <div 
        className="collapsedNavbar"
        onClick={this.toggleCollapse}
      >
        <a className="btn button-large hamBurglar">
          <b>≡</b>
        </a>
      </div>
    )
  }

  renderExpanded = () => {
    return (
      <div 
        className="expandedNavbar"
      >
        <div className="list-group">
          <div className="list-group-item list-group-item-primary list-group-item-heading">
            <div className="row">
              <div>
                <b>Name</b>
              </div>
              <button 
                className="sidebarCloseIcon"
                onClick={this.toggleCollapse}
              >
                &times;
              </button>
            </div>
          </div>
          <div className="list-group-item list-group-item-light">
            <div className="text-center">
              <img 
                className="sidebarPic" 
                src="https://media.apnarm.net.au/media/images/2016/03/21/babymeme_620x310-dsghuu4e57q2783lwl2_ct300x300.jpg"
                alt="Person's Image" 
              />
            </div>
            <table>
              <tbody>
                <tr>
                  <td className="table-active">Phone</td>
                  <td>(514) 123-4567</td>
                </tr>
                <tr>
                  <td className="table-active">Age</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td className="table-active">Height</td>
                  <td>50 cm</td>
                </tr>
                <tr>
                  <td className="table-active">Weight</td>
                  <td>15 kg</td>
                </tr>
                <tr>
                  <td className="table-active">Heart Rate</td>
                  <td>80 BPM</td>
                </tr>
                <tr>
                  <td className="table-active">Vocation</td>
                  <td>Developer</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <button className="btn btn-danger">
                      <i className="far fa-compass"></i> Directions
                    </button> <button 
                      className="btn btn-success">
                      <i className="fas fa-map-marker"></i> Location
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        { this.state.collapsed 
          ? this.renderCollapsed()
          : this.renderExpanded()
        } 
      </div>
    );
  }
}

export default Sidebar;