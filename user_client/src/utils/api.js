import Axios from "axios";

const baseURL = "http://localhost:5000/";

const generateRandomCoords = () => {
  let longitude = Math.random() + 20;
  let latitude = Math.random() + 7;
  let coord = {
    longitude: longitude,
    latitude: latitude
  };
};

export const postMemberRegister = (
  username,
  password,
  name,
  profession,
  birthday,
  gender
) => {
  let randomLocation = generateRandomCoords();
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
      location: randomLocation
    }
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
