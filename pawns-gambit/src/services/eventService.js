import apiClient, { extractData } from './apiClient';

/**
 * Transform Strapi event data to match frontend EventCard expectations
 */
const transformEventData = (event) => {
  if (!event) return null;
  
  // Extract date and time from startDate (handle both string and date objects)
  let startDate;
  if (event.startDate) {
    startDate = new Date(event.startDate);
  } else if (event.date) {
    startDate = new Date(event.date);
  } else {
    startDate = new Date();
  }
  
  const endDate = event.endDate ? new Date(event.endDate) : null;
  
  // Format time as HH:MM (only if date is valid)
  const time = !isNaN(startDate.getTime()) ? startDate.toTimeString().slice(0, 5) : '00:00';
  
  // Handle coverImage - it might be a direct object with url or a nested Strapi media object
  let imageUrl = null;
  if (event.coverImage) {
    if (typeof event.coverImage === 'string') {
      imageUrl = event.coverImage;
    } else if (event.coverImage.url) {
      imageUrl = event.coverImage.url; // Already processed by apiClient
    } else if (event.coverImage.formats?.large?.url) {
      imageUrl = event.coverImage.formats.large.url;
    } else if (event.coverImage.formats?.medium?.url) {
      imageUrl = event.coverImage.formats.medium.url;
    } else if (event.coverImage.formats?.small?.url) {
      imageUrl = event.coverImage.formats.small.url;
    }
  }

  const transformed = {
    ...event,
    // Map Strapi fields to EventCard expected fields
    id: event.id,
    title: event.title || 'Untitled Event',
    description: event.description || '',
    date: event.startDate || event.date || new Date().toISOString(), // Keep startDate as date
    time: time, // Extract time from startDate
    type: event.eventType || event.type || 'tournament', // Map eventType to type
    participants: Number(event.currentParticipants) || 0, // Map currentParticipants to participants
    maxParticipants: Number(event.maxParticipants) || 100,
    image: imageUrl || event.image, // Map coverImage to image URL
    imageAlt: event.coverImage?.alternativeText || event.coverImage?.caption || event.title || 'Event image',
    prizes: event.prizePool || event.prizes || null, // Map prizePool to prizes (already formatted in Strapi)
    skillLevel: event.skillLevel || 'all levels', // Default if missing
    entryFee: Number(event.entryFee) || 0, // Default to free if missing
    location: event.location || 'TBD',
    address: event.address || '',
    featured: Boolean(event.featured),
    registrationLink: event.registrationLink || '',
    organizer: event.organizer || '',
    // Keep original fields too for flexibility
    startDate: event.startDate,
    endDate: event.endDate,
    eventType: event.eventType,
    currentParticipants: event.currentParticipants,
    coverImage: event.coverImage,
    prizePool: event.prizePool,
  };
  
  console.log('✨ Transformed event:', {
    title: transformed.title,
    image: transformed.image,
    participants: transformed.participants,
    maxParticipants: transformed.maxParticipants,
    date: transformed.date,
    location: transformed.location
  });
  
  return transformed;
};

/**
 * Transform array of events
 */
const transformEvents = (events) => {
  if (!Array.isArray(events)) return [];
  return events.map(transformEventData);
};

const eventService = {
  /**
   * Fetch all events
   * @param {Object} options - Query options
   * @returns {Promise<Array>}
   */
  async fetchEvents(options = {}) {
    const {
      page = 1,
      pageSize = 12,
      sort = 'startDate:desc',
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

    const response = await apiClient.get(`/events?${params.toString()}`);
    const data = extractData(response);
    return transformEvents(data);
  },

  /**
   * Fetch upcoming events
   * @param {number} limit - Number of events to fetch
   * @returns {Promise<Array>}
   */
  async fetchUpcomingEvents(limit = 6) {
    const now = new Date().toISOString();
    const response = await apiClient.get(
      `/events?filters[startDate][$gte]=${now}&sort=startDate:asc&pagination[limit]=${limit}&populate=*`
    );
    const data = extractData(response);
    return transformEvents(data);
  },

  /**
   * Fetch featured events
   * @returns {Promise<Array>}
   */
  async fetchFeaturedEvents() {
    const response = await apiClient.get(
      '/events?filters[featured][$eq]=true&populate=*'
    );
    const data = extractData(response);
    return transformEvents(data);
  },

  /**
   * Fetch a single event by ID
   * @param {number} id - Event ID
   * @returns {Promise<Object>}
   */
  async fetchEventById(id) {
    const response = await apiClient.get(`/events/${id}?populate=*`);
    const data = extractData(response);
    return transformEventData(data);
  },

  /**
   * Fetch events by type
   * @param {string} eventType - Event type (tournament, workshop, meetup, online)
   * @returns {Promise<Array>}
   */
  async fetchEventsByType(eventType) {
    const response = await apiClient.get(
      `/events?filters[eventType][$eq]=${eventType}&populate=*`
    );
    const data = extractData(response);
    return transformEvents(data);
  },

  /**
   * Register for an event (increment participants)
   * @param {number} id - Event ID
   * @param {number} currentParticipants - Current participant count
   * @returns {Promise<Object>}
   */
  async registerForEvent(id, currentParticipants) {
    try {
      const response = await apiClient.put(`/events/${id}`, {
        data: {
          currentParticipants: (currentParticipants || 0) + 1,
        },
      });
      const data = extractData(response);
      return transformEventData(data);
    } catch (error) {
      console.error('Failed to register for event:', error);
      throw error;
    }
  },

  /**
   * Fetch past events
   * @param {number} limit - Number of events to fetch
   * @returns {Promise<Array>}
   */
  async fetchPastEvents(limit = 6) {
    const now = new Date().toISOString();
    const response = await apiClient.get(
      `/events?filters[endDate][$lte]=${now}&sort=endDate:desc&pagination[limit]=${limit}&populate=*`
    );
    const data = extractData(response);
    return transformEvents(data);
  },
};

export default eventService;

