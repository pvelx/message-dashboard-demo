import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import {API_URL} from "./config";

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  get(resource, query = "") {
    return Vue.axios.get(`${resource}/${query}`);
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  update(resource, query, params) {
    return Vue.axios.put(`${resource}/${query}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource) {
    return Vue.axios.delete(resource);
  }
};

export default ApiService;

export const MessageService = {
  get() {
    return ApiService.get("message");
  },
  create(params) {
    return ApiService.post("message", params);
  },
  cancelSending(id) {
    return ApiService.delete(`message/${id}`);
  }
};
