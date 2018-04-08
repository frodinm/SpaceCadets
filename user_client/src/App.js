import React, { Component } from "react";
import Camera from "react-camera";
import io from "socket.io-client";
import { default as RegisterButton } from "./components/register";
import { default as SignInButton } from "./components/SignIn";
import "antd/dist/antd.css";
import {
  postMemberRegister,
  postMemberLogin,
  postMemberLogout
} from "./utils/api";
import { Icon, Button } from "antd";

const socket = io("https://6ec8bff1.ngrok.io");

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: "",
      isLoggedIn: false
    };

    socket.on("photo", photo => {
      console.log(photo);
      this.setState({
        photo: photo
      });
    });
  }

  login = (username, password) => {
    postMemberLogin(username, password).then(response => {
      if (response.data.message) {
        this.setState({
          isLoggedIn: true
        });
      } else {
        console.log(response);
      }
    });
  };

  register = (username, password, name, profession, birthday, gender) => {
    postMemberRegister(
      username,
      password,
      name,
      profession,
      birthday,
      gender
    ).then(response => {
      if (response.data.message) {
        this.setState({
          isLoggedIn: true
        });
      } else {
        alert(response.data.error);
      }
    });
  };

  logout = () => {
    postMemberLogout().then(response => {
      console.log(response);
      if (response.data.message) {
        this.setState({
          isLoggedIn: false
        });
      }
    });
  };

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
        <div style={{ display: "flex", backgroundColor: "white" }}>
          <h3 style={{ paddingLeft: "10px", margin: "auto", width: "100%" }}>
            Space Cadets
          </h3>
          {this.state.isLoggedIn ? (
            <div style={{ margin: "10px" }}>
              <Button type="primary" onClick={this.logout}>
                Log out
              </Button>
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              <div style={{ margin: "10px" }}>
                <SignInButton login={this.login} />
              </div>
              <div style={{ margin: "10px" }}>
                <RegisterButton register={this.register} />
              </div>
            </div>
          )}
        </div>
        {this.state.isLoggedIn ? (
          <div>
            <Camera
              style={style.preview}
              ref={cam => {
                this.camera = cam;
              }}
            />
            <div style={style.captureContainer} onClick={this.takePicture}>
              <div style={style.captureButton}>
                <Icon
                  style={{
                    fontSize: "30px",
                    margin: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    height: "100%"
                  }}
                  type="camera-o"
                />
              </div>
            </div>
            <img style={style.captureImage} src={this.state.photo} />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const style = {
  container: {
    height: "auto"
  },
  preview: {
    position: "relative",
    height: "auto"
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
    backgroundColor: "white",
    boxShadow: "0px 0px 4px #5d5d5d",
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
