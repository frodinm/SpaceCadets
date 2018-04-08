import Axios from "axios";

const baseURL = "https://e2c18673.ngrok.io";

const generateData = () => {
  let latitude = Math.random() / 5 + 20.3554841;
  let longitude = Math.random() / 5 + 7.5730188;
  let heartRate = Math.random() * 100 + 60;
  let height = Math.random() * 5 + 180;
  let weight = Math.random() * 10 + 175;

  let data = {
    latitude: latitude,
    longitude: longitude,
    heartRate: heartRate,
    height: height,
    weight: weight
  };
  return data;
};

export const postMemberRegister = (
  username,
  password,
  name,
  profession,
  birthday,
  gender,
  phone
) => {
  return new Promise(resolve => {
    let data = generateData();
    resolve(data);
  }).then(data => {
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
        location: {
          longitude: data.longitude,
          latitude: data.latitude
        },
        heartRate: data.heartRate,
        height: data.height,
        weight: data.weight,
        phone: phone
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
