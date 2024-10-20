import axios from "axios";

const UploadFileAPI = axios.create({
  baseURL: "https://your-api-base-url.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default UploadFileAPI;
