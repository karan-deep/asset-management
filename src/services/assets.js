import axios from "axios";
import { environment } from "../environment";

const AssetService = {
  //Function using axios to make API request to get one asset details with 'id' parameter that returns a promise
  getAsset: async (id) => {
    return axios.get(environment.apiBasePath + "/assets/" + id);
  },

  //Function using axios to make API request to get all assets that returns a promise
  getAssets: async () => {
    return axios.get(environment.apiBasePath + "/assets");
  },

  //Function using axios to make API request to create one asset with requestBody that returns a promise
  create: async (requestBody) => {
    return axios.post(environment.apiBasePath + "/assets", requestBody);
  },

  //Function using axios to make API request to update one asset with 'id' parameter and requestBody that returns a promise
  update: async (id, requestBody) => {
    return axios.put(environment.apiBasePath + "/assets/" + id, requestBody);
  },

  //Function using axios to make API request to delete one asset with 'id' parameter that returns a promise
  delete: async (id) => {
    return axios.delete(environment.apiBasePath + "/assets/" + id);
  },
};

export default AssetService;
