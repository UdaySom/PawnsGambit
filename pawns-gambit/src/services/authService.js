import apiClient, { extractData } from './apiClient';

const authService = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>}
   */
  async register({ username, email, password }) {
    try {
      const response = await apiClient.post('/auth/local/register', {
        username,
        email,
        password,
      });

      const { jwt, user } = response.data;

      if (jwt) {
        localStorage.setItem('authToken', jwt);
        localStorage.setItem('user', JSON.stringify(user));
      }

      return { user, token: jwt };
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },

  /**
   * Login user
   * @param {Object} credentials - Login credentials
   * @returns {Promise<Object>}
   */
  async login({ identifier, password }) {
    try {
      const response = await apiClient.post('/auth/local', {
        identifier, // Can be email or username
        password,
      });

      const { jwt, user } = response.data;

      if (jwt) {
        localStorage.setItem('authToken', jwt);
        localStorage.setItem('user', JSON.stringify(user));
      }

      return { user, token: jwt };
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('auth-logout'));
  },

  /**
   * Get current user from token
   * @returns {Promise<Object>}
   */
  async getCurrentUser() {
    try {
      const response = await apiClient.get('/users/me');
      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Failed to get current user:', error);
      this.logout();
      return null;
    }
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  },

  /**
   * Get stored user data
   * @returns {Object|null}
   */
  getStoredUser() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  /**
   * Update user password
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise<Object>}
   */
  async changePassword(currentPassword, newPassword, passwordConfirmation) {
    try {
      const response = await apiClient.post('/auth/change-password', {
        currentPassword,
        password: newPassword,
        passwordConfirmation,
      });

      return response.data;
    } catch (error) {
      console.error('Password change failed:', error);
      throw error;
    }
  },

  /**
   * Request password reset
   * @param {string} email - User email
   * @returns {Promise<Object>}
   */
  async forgotPassword(email) {
    try {
      const response = await apiClient.post('/auth/forgot-password', {
        email,
      });

      return response.data;
    } catch (error) {
      console.error('Forgot password request failed:', error);
      throw error;
    }
  },

  /**
   * Reset password with code
   * @param {string} code - Reset code from email
   * @param {string} password - New password
   * @param {string} passwordConfirmation - Password confirmation
   * @returns {Promise<Object>}
   */
  async resetPassword(code, password, passwordConfirmation) {
    try {
      const response = await apiClient.post('/auth/reset-password', {
        code,
        password,
        passwordConfirmation,
      });

      const { jwt, user } = response.data;

      if (jwt) {
        localStorage.setItem('authToken', jwt);
        localStorage.setItem('user', JSON.stringify(user));
      }

      return { user, token: jwt };
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    }
  },
};

export default authService;

