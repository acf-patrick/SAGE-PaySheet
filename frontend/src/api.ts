import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT || "http://localhost:3000/api/",
});

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("access_token");
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const res = await axios.post(
          import.meta.env.VITE_API_ENDPOINT + "auth/refresh",
          null,
          {
            headers: {
              Authorization: "Bearer " + refreshToken,
            },
          }
        );
        const newAccessToken = res.data.access_token;
        localStorage.setItem("access_token", newAccessToken);
        return api(error.config);
      } catch (err) {
        location.pathname = "/";
      }
    }
  }
);
