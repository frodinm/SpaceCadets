import React from "react";

export default class Notif extends React.Component {
  render() {
    const { notif } = this.props;

    console.log(notif);
    return (
      <div className="list-group">
        <div className="list-group-item list-group-item-primary list-group-item-heading">
          <div className="row">
            <div>
              <b>{notif.name}</b>
            </div>
            <button className="sidebarCloseIcon" onClick={this.toggleCollapse}>
              &times;
            </button>
          </div>
        </div>
        <div className="list-group-item list-group-item-light">
          <div className="text-center">
            <img
              className="sidebarPic"
              src={notif.photo}
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
                <td>{notif.height} cm</td>
              </tr>
              <tr>
                <td className="table-active">Weight</td>
                <td>{notif.weight} kg</td>
              </tr>
              <tr>
                <td className="table-active">Heart Rate</td>
                <td>{notif.heartRate} BPM</td>
              </tr>
              <tr>
                <td className="table-active">Vocation</td>
                <td>{notif.profession}</td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button className="btn btn-danger">
                    <i className="far fa-compass" /> Directions
                  </button>{" "}
                  <button className="btn btn-success">
                    <i className="fas fa-map-marker" /> Location
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
