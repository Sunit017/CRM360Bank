/* istanbul ignore file */
import axios from "axios";
import { BASE_URL } from "../configBase";
// let baseURI = '';
// process.env.NODE_ENV === 'development'
//   ? (baseURI = process.env.REACT_APP_STRAPI_DEV_URI)
//   : (baseURI = process.env.REACT_APP_STRAPI_PROD_URI);
// axios.defaults.baseURL = baseURI;

const clientApi = axios.create({
  baseURL: BASE_URL,
  method: "GET",
  headers: {
    //  Authorization: `<Your Auth Token>`,
    ContentType: "application/json",
    Accept: "application/json",
    timeout: 1000,
  },
  // .. other options
});

export default clientApi;
