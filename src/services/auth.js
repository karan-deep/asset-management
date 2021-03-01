import axios from "axios";
import { environment } from "../environment";

const AuthService = {
  isLogin: false,
  token: "",

  //Function using axios to make API request to authenticate the user for login that returns a promise
  login: async (requestBody) => {
    return axios.post(environment.apiBasePath + "/authenticate", requestBody);
  },

  //Function using axios to make API request to register the user that returns a promise
  register: async (requestBody) => {
    return axios.post(environment.apiBasePath + "/register", requestBody);
  },
};

export default AuthService;
