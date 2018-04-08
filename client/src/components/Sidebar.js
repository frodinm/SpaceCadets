import React, { Component } from "react";
import { Notif } from "../components";

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: true
    };
  }

  toggleCollapse = event => {
    this.setState(st => {
      return {
        collapsed: !st.collapsed
      };
    });
  };

  renderCollapsed = () => {
    return (
      <div className="collapsedNavbar" onClick={this.toggleCollapse}>
        <a className="btn button-large hamBurglar">
          <b>≡</b>
        </a>
      </div>
    );
  };

  renderExpanded = () => {
    const { notificationList, clarifaiList } = this.props;
    return (
      <div className="expandedNavbar">
        {notificationList.map((notif, key) => (
          <Notif key={key} notif={notif} clarifai={clarifaiList[key]} />
        ))}
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.state.collapsed ? this.renderCollapsed() : this.renderExpanded()}
      </div>
    );
  }
}

export default Sidebar;
