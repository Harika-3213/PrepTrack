
import axios from "axios";

// Normalize API base URL: trim trailing slashes and ensure /api endpoint prefix
const getBaseURL = () => {
    let url = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").trim().replace(/\/+$/, "");
    if (!url.endsWith("/api")) {
        url = `${url}/api`;
    }
    return url;
};

const api = axios.create({
    baseURL: getBaseURL()
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
