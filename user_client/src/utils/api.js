import Axios from "axios";

const baseURL = "https://6ec8bff1.ngrok.io";

export const postMemberRegister = (
  username,
  password,
  name,
  profession,
  birthday,
  gender
) => {
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
      location: { longitude: 100, latitude: 150 }
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
