import axios from "axios";
import { environment } from "../environment";

const AssetService = {
  getAsset: async (id) => {
    return axios.get(environment.apiBasePath + "/assets/" + id);
  },
  getAssets: async () => {
    return axios.get(environment.apiBasePath + "/assets");
  },
  create: async (requestBody) => {
    return axios.post(environment.apiBasePath + "/assets", requestBody);
  },
  update: async (id, requestBody) => {
    return axios.put(environment.apiBasePath + "/assets/" + id, requestBody);
  },
  delete: async (id) => {
    return axios.delete(environment.apiBasePath + "/assets/" + id);
  },
};

export default AssetService;
