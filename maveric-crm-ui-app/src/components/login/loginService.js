import axios from "axios";
import { BASE_SEARCH_URL } from "../../configBase";
import Swal from "sweetalert2";

export const getAccessToken = (data, callback) => {
  //const url = `${BASE_SEARCH_URL}/search?customerId=${data.customerId}&firstName=${data.firstName}&middleName=${data.middleName}&lastName=${data.lastName}&emailAddress=${data.emailAddress}&ekycArnNumber=${data.idmArnNo}&mobileNumber=${data.mobileNumber}`
  console.log("input=", callback);
  const url = `${BASE_SEARCH_URL}/login`;
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let payload = data;
  axios
    .post(url, payload, config)
    .then((response) => {
      console.log(response);
      callback("/app/dashboard");
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
    })

    .catch((error) => {
      console.log(error);
      Swal.fire({
        title: "Login Failed!",
        text: "Incorrect email or password.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    });
};
