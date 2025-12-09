import apiClient, { extractData } from './apiClient';

const newsService = {
  /**
   * Fetch all news articles
   * @param {Object} options - Query options
   * @returns {Promise<Array>}
   */
  async fetchNews(options = {}) {
    const {
      page = 1,
      pageSize = 9,
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

    const response = await apiClient.get(`/news-articles?${params.toString()}`);
    return extractData(response);
  },

  /**
   * Fetch featured news
   * @param {number} limit - Number of articles to fetch
   * @returns {Promise<Array>}
   */
  async fetchFeaturedNews(limit = 3) {
    const response = await apiClient.get(
      `/news-articles?filters[featured][$eq]=true&pagination[limit]=${limit}&populate=*`
    );
    return extractData(response);
  },

  /**
   * Fetch a single news article by ID
   * @param {number} id - Article ID
   * @returns {Promise<Object>}
   */
  async fetchNewsById(id) {
    const response = await apiClient.get(`/news-articles/${id}?populate=*`);
    return extractData(response);
  },

  /**
   * Fetch news by category
   * @param {string} category - Category (announcement, feature, interview)
   * @returns {Promise<Array>}
   */
  async fetchNewsByCategory(category) {
    const response = await apiClient.get(
      `/news-articles?filters[category][$eq]=${category}&populate=*`
    );
    return extractData(response);
  },

  /**
   * Fetch recent news
   * @param {number} limit - Number of articles to fetch
   * @returns {Promise<Array>}
   */
  async fetchRecentNews(limit = 5) {
    const response = await apiClient.get(
      `/news-articles?sort=publishDate:desc&pagination[limit]=${limit}&populate=*`
    );
    return extractData(response);
  },
};

export default newsService;

