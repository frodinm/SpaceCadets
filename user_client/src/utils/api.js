import Axios from "axios";

const baseURL = "https://a7c5899f.ngrok.io";

const generateRandomCoords = () => {
  let longitude = Math.random() + 20;
  let latitude = Math.random() + 7;
  let coord = {
    longitude: longitude,
    latitude: latitude
  };
  return coord;
};

export const postMemberRegister = (
  username,
  password,
  name,
  profession,
  birthday,
  gender
) => {
  new Promise(resolve => {
    let randomLocation = generateRandomCoords();
    resolve(randomLocation);
  }).then(response => {
    console.log(response);
    return Axios.request({
      baseURL,
      method: "post",
      url: "/member/register",
      data: {
        username: username,
        name: name,
        profession: profession,
        birthday: birthday,
        gender: gender,
        password: password,
        location: response
      }
    });
  });
};

export const postMemberLogin = (username, password) => {
  return Axios.request({
    baseURL,
    method: "post",
    url: "/member/login",
    data: {
      username: username,
      password: password
    }
  });
};

export const postMemberLogout = () => {
  return Axios.request({
    baseURL,
    method: "post",
    url: "/member/logout"
  });
};
