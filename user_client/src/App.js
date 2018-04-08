import React, { Component } from "react";
import Camera from "react-camera";
import io from "socket.io-client";
import { default as RegisterButton } from "./components/register";
import { default as SignInButton } from "./components/SignIn";
import "antd/dist/antd.css";
const socket = io("https://6ec8bff1.ngrok.io");

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: ""
    };

    socket.on("photo", photo => {
      console.log(photo);
      this.setState({
        photo: photo
      });
    });
  }

  takePicture = () => {
    this.camera.capture().then(blob => {
      //convert blob to base64
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function() {
        let base64data = reader.result;
        socket.emit("photo", base64data);
      };
    });
  };

  render() {
    return (
      <div style={style.container}>
        <SignInButton />
        <RegisterButton />

        <Camera
          style={style.preview}
          ref={cam => {
            this.camera = cam;
          }}
        >
          <div style={style.captureContainer} onClick={this.takePicture}>
            <div style={style.captureButton} />
          </div>
        </Camera>
        <img style={style.captureImage} src={this.state.photo} />
      </div>
    );
  }
}

const style = {
  preview: {
    position: "relative",
    height: "100vh"
  },
  captureContainer: {
    display: "flex",
    position: "absolute",
    justifyContent: "center",
    zIndex: 1,
    bottom: 0,
    width: "100%"
  },
  captureButton: {
    backgroundColor: "#fff",
    borderRadius: "50%",
    height: 56,
    width: 56,
    color: "#000",
    margin: 20
  },
  captureImage: {
    width: "100%"
  }
};
