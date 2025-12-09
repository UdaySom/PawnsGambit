import apiClient, { extractData } from './apiClient';

const communityService = {
  /**
   * Fetch all community members
   * @param {Object} options - Query options
   * @returns {Promise<Array>}
   */
  async fetchMembers(options = {}) {
    const {
      page = 1,
      pageSize = 12,
      sort = 'rating:desc',
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

    const response = await apiClient.get(`/community-members?${params.toString()}`);
    return extractData(response);
  },

  /**
   * Fetch a single member profile
   * @param {number} id - Member ID
   * @returns {Promise<Object>}
   */
  async fetchMemberProfile(id) {
    const response = await apiClient.get(`/community-members/${id}?populate=*`);
    return extractData(response);
  },

  /**
   * Search members by name or username
   * @param {string} query - Search query
   * @returns {Promise<Array>}
   */
  async searchMembers(query) {
    const response = await apiClient.get(
      `/community-members?filters[$or][0][name][$containsi]=${query}&filters[$or][1][username][$containsi]=${query}&populate=*`
    );
    return extractData(response);
  },

  /**
   * Fetch top rated members
   * @param {number} limit - Number of members to fetch
   * @returns {Promise<Array>}
   */
  async fetchTopMembers(limit = 10) {
    const response = await apiClient.get(
      `/community-members?sort=rating:desc&pagination[limit]=${limit}&populate=*`
    );
    return extractData(response);
  },

  /**
   * Fetch all achievements
   * @returns {Promise<Array>}
   */
  async fetchAchievements() {
    const response = await apiClient.get('/achievements?populate=*');
    return extractData(response);
  },

  /**
   * Fetch achievements by type
   * @param {string} type - Achievement type (tournament, milestone, special)
   * @returns {Promise<Array>}
   */
  async fetchAchievementsByType(type) {
    const response = await apiClient.get(
      `/achievements?filters[type][$eq]=${type}&populate=*`
    );
    return extractData(response);
  },

  /**
   * Fetch member statistics
   * @returns {Promise<Object>}
   */
  async fetchStats() {
    try {
      const response = await apiClient.get('/community-members?pagination[limit]=1000');
      const members = extractData(response);
      
      if (!Array.isArray(members)) return null;

      const totalMembers = members.length;
      const totalGames = members.reduce((sum, m) => sum + (m.totalGames || 0), 0);
      const avgRating = Math.round(
        members.reduce((sum, m) => sum + (m.rating || 0), 0) / totalMembers
      );

      return {
        totalMembers,
        totalGames,
        avgRating,
        activeToday: Math.floor(totalMembers * 0.15), // Mock value
        onlineNow: Math.floor(totalMembers * 0.05), // Mock value
      };
    } catch (error) {
      console.error('Failed to fetch community stats:', error);
      return null;
    }
  },
};

export default communityService;

