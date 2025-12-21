import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://0.0.0.0:1337/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer b47935d876ca326f7fab929e068c2a10424a33f76f7e49e098d5bb7e83d93d3406499783665267d1e5b4830af6632c3403484f532c598618aca826054a8ef666bba9c4e07d0c1cc872673e15159f09d35c7f78bda3368f58c6457f773c565c05e9392d43e6f44a23ce81a72b65a9438d451675cd6a49339ddd714795419dbb81',
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
  return `${import.meta.env.VITE_STRAPI_MEDIA_URL || 'http://localhost:1337'}${url}`;
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

