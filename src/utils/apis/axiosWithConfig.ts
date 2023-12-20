import axios from "axios";

let bearerToken = "";

const axiosWithConfig = axios.create();

export const setAxiosConfig = (token: string) => {
  bearerToken = token;
};

axiosWithConfig.interceptors.request.use((axiosConfig) => {
  axiosConfig.baseURL = import.meta.env.VITE_BASE_URL;
  
  // axiosConfig.headers.Authorization = `Bearer ${bearerToken}`;
  axiosConfig.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDMwOTI5MzEyMjUsImlhdCI6MTcwMzA4NTczMTIyNSwiaWQiOjN9.WOxFkQBClqiAZcQAfnM-T6dIRVYhll3lG83OuVQH9Bc`;

  return axiosConfig;
});

export default axiosWithConfig;
