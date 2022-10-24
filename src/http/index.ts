import axios from "axios";
import { AuthResponse } from "../models/response/authResponse";

export const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL
});

api.interceptors.request.use((config) => {
  config.headers = config.headers ?? {};
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

// api.interceptors.response.use(
//   (config) => {
//     return config;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response.status === 401 &&
//       error.config &&
//       !error.config._isRetry
//     ) {
//       try {
//         originalRequest._isRetry = true;
//         const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
//           withCredentials: true
//         });
//         localStorage.setItem("token", response.data.tokens.accessToken);
//         return api.request(originalRequest);
//       } catch (e) {
//         console.log("Not authorized");
//       }
//     }
//   }
// );

export default api;
