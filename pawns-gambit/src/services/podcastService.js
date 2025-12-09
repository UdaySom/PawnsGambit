import apiClient, { extractData } from './apiClient';

const podcastService = {
  /**
   * Fetch all podcast episodes
   * @param {Object} options - Query options
   * @returns {Promise<Array>}
   */
  async fetchEpisodes(options = {}) {
    const {
      page = 1,
      pageSize = 10,
      sort = 'publishDate:desc',
      filters = {},
    } = options;

    const params = new URLSearchParams({
      'pagination[page]': page,
      'pagination[pageSize]': pageSize,
      sort,
      'populate': '*',
    });

    // Add filters
    Object.keys(filters).forEach(key => {
      params.append(`filters[${key}][$eq]`, filters[key]);
    });

    const response = await apiClient.get(`/podcasts?${params.toString()}`);
    return extractData(response);
  },

  /**
   * Fetch a single podcast episode by ID
   * @param {number} id - Episode ID
   * @returns {Promise<Object>}
   */
  async fetchEpisodeById(id) {
    const response = await apiClient.get(`/podcasts/${id}?populate=*`);
    return extractData(response);
  },

  /**
   * Fetch featured podcast episode
   * @returns {Promise<Object>}
   */
  async fetchFeaturedEpisode() {
    const response = await apiClient.get(
      '/podcasts?filters[featured][$eq]=true&populate=*&pagination[limit]=1'
    );
    const data = extractData(response);
    return Array.isArray(data) ? data[0] : data;
  },

  /**
   * Increment listen count for an episode
   * @param {number} id - Episode ID
   * @param {number} currentListens - Current listen count
   * @returns {Promise<Object>}
   */
  async incrementListens(id, currentListens) {
    try {
      const response = await apiClient.put(`/podcasts/${id}`, {
        data: {
          listens: (currentListens || 0) + 1,
        },
      });
      return extractData(response);
    } catch (error) {
      console.error('Failed to increment listen count:', error);
      return null;
    }
  },

  /**
   * Search podcasts by title or description
   * @param {string} query - Search query
   * @returns {Promise<Array>}
   */
  async searchEpisodes(query) {
    const response = await apiClient.get(
      `/podcasts?filters[$or][0][title][$containsi]=${query}&filters[$or][1][description][$containsi]=${query}&populate=*`
    );
    return extractData(response);
  },

  /**
   * Fetch episodes by tag
   * @param {string} tagSlug - Tag slug
   * @returns {Promise<Array>}
   */
  async fetchEpisodesByTag(tagSlug) {
    const response = await apiClient.get(
      `/podcasts?filters[tags][slug][$eq]=${tagSlug}&populate=*`
    );
    return extractData(response);
  },
};

export default podcastService;

