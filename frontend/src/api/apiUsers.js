import axios from "axios";

const axiosClient = axios.create({
  baseURL: `http://127.0.0.1:4000/api/v1/users`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;
    if (res.status === 401) {
      window.location.href = "http://127.0.0.1:4000";
    }
    console.error("Looks like there was a problem. Status Code: " + res.status);
    return Promise.reject(error);
  }
);

export default axiosClient;
