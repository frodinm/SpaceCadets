import Axios from "axios";

const baseURL = "http://localhost:5000/";

const baseChatURL = "https://api.dialogflow.com/v1/";

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

export const getDialogFlow = (query) =>{
  return Axios.request({
    baseURL:baseChatURL,
    method: 'post',
    headers: {
      Authorization: `Bearer 4293dda73a4a4d4a94111bd65b37b441`
    },
    url: '/query?v=20150910',
    data:{
      lang: "en",
      sessionId: "12345",
      query 
    }
  })
}
