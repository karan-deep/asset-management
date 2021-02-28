import axios from "axios";
import { environment } from "../environment";

const AuthService = {
  isLogin: false,
  token: "",
  login: async (requestBody) => {
    return axios.post(environment.apiBasePath + "/authenticate", requestBody);
  },
  register: async (requestBody) => {
    return axios.post(environment.apiBasePath + "/register", requestBody);
  },
};

export default AuthService;
