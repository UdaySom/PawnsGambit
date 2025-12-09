export default ({ env }) => ({
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
      register: {
        allowedFields: ['username', 'email', 'password'],
      },
    },
  },
  upload: {
    config: {
      sizeLimit: 250 * 1024 * 1024, // 250MB for audio files
    },
  },
});
