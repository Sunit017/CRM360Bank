import axios from "axios";
import { MAMBU_DOMAIN_URL } from "../../configBase";

export const getAuthDetails = () => {
  const url = `${MAMBU_DOMAIN_URL}/remote-token/token`;
  const requestParam = {
    client_id: "2DBARWKtRP2t0ohvf5emVVS2F92QH9Qhtg1tADfumth96XYN",
    client_secret:
      "VlAEZChW0erYlca5t7uLJ8judHcDZCQDuwFnJzNoWENsdLdPM5zrkgXjzQeDiWja",
    grant_type: "client_credentials",
  };
  return axios.post(url, requestParam).then((response) => response.data);
};
