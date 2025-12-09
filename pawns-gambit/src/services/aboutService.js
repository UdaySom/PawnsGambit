import apiClient, { extractData } from './apiClient';

/**
 * Transform team member data to include proper image URLs
 */
const transformTeamMember = (member) => {
  if (!member) return null;

  // Handle photo - ensure we get the full URL
  let photoUrl = null;
  if (member.photo) {
    if (typeof member.photo === 'string') {
      photoUrl = member.photo;
    } else if (member.photo.url) {
      photoUrl = member.photo.url; // Already processed by apiClient
    } else if (member.photo.formats?.medium?.url) {
      photoUrl = member.photo.formats.medium.url;
    } else if (member.photo.formats?.small?.url) {
      photoUrl = member.photo.formats.small.url;
    } else if (member.photo.formats?.thumbnail?.url) {
      photoUrl = member.photo.formats.thumbnail.url;
    }
  }

  return {
    ...member,
    photo: photoUrl ? { url: photoUrl } : null,
  };
};

const aboutService = {
  /**
   * Fetch all team members
   * @returns {Promise<Array>}
   */
  async fetchTeamMembers() {
    const response = await apiClient.get('/team-members?sort=order:asc&populate=*');
    const data = extractData(response);
    return Array.isArray(data) ? data.map(transformTeamMember) : [];
  },

  /**
   * Fetch all partners
   * @returns {Promise<Array>}
   */
  async fetchPartners() {
    const response = await apiClient.get('/partners?populate=*');
    return extractData(response);
  },

  /**
   * Fetch all press articles
   * @returns {Promise<Array>}
   */
  async fetchPress() {
    const response = await apiClient.get('/press-articles?sort=publishDate:desc&populate=*');
    return extractData(response);
  },

  /**
   * Fetch timeline events
   * @returns {Promise<Array>}
   */
  async fetchTimeline() {
    const response = await apiClient.get('/timeline-events?sort=order:asc&populate=*');
    return extractData(response);
  },

  /**
   * Fetch all about page data at once
   * @returns {Promise<Object>}
   */
  async fetchAllAboutData() {
    try {
      const [team, partners, press, timeline] = await Promise.all([
        this.fetchTeamMembers(),
        this.fetchPartners(),
        this.fetchPress(),
        this.fetchTimeline(),
      ]);

      return {
        team,
        partners,
        press,
        timeline,
      };
    } catch (error) {
      console.error('Failed to fetch about page data:', error);
      throw error;
    }
  },
};

export default aboutService;

