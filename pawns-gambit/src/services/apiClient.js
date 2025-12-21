import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://pawnsgambit.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 294a4cf77e95dbb989e1b301810bfd86c39fa7171e339d2dc9b9960646d2ab83717d99fee3c0ef5cdcb89d14686d87b7202bc22e13d25c197314720ba847228dee7a9af719df830ffd2a6782c12a17e0f40717ffb55f6a75659fe69898962e326dda1bd73fef0318af7614c1409f753c1f001c380c5552b9a9ac22b3156d4e7b',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('auth-error'));
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// Helper function to build Strapi media URL
export const getMediaUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `http://0.0.0.0:1337${url}`;
};

// Helper function to extract data from Strapi response (supports v4 and v5)
export const extractData = (response) => {
  if (!response?.data) return null;
  const { data } = response.data;
  const normalize = (item) => transformStrapiData(item);
  return Array.isArray(data) ? data.map(normalize) : normalize(data);
};

// Transform Strapi data format to simpler structure (v4 or v5)
const transformStrapiData = (item) => {
  if (!item) return null;

  // v4 shape: { id, attributes: {...} }
  // v5 shape: { id, ...fields }
  const base = item.attributes ? { id: item.id, ...item.attributes } : { ...item };

  // Normalize media/relations for both shapes
  Object.keys(base).forEach((key) => {
    const value = base[key];

    // v4 relations/media: { data: {...} } or { data: [{...}] }
    if (value?.data) {
      if (Array.isArray(value.data)) {
        base[key] = value.data.map((node) => ({
          id: node.id,
          ...(node.attributes || {}),
          url: getMediaUrl(node.attributes?.url),
        }));
      } else {
        base[key] = {
          id: value.data.id,
          ...(value.data.attributes || {}),
          url: getMediaUrl(value.data.attributes?.url),
        };
      }
      return;
    }

    // v5 media already flattened: { id, url, ... } or array of those
    if (Array.isArray(value)) {
      base[key] = value.map((v) =>
        v && typeof v === 'object' && v.url ? { ...v, url: getMediaUrl(v.url) } : v
      );
    } else if (value && typeof value === 'object' && value.url) {
      base[key] = { ...value, url: getMediaUrl(value.url) };
    }
  });

  return base;
};

