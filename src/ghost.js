// src/utils/ghost.js
import GhostContentAPI from '@tryghost/content-api';

// Create API instance with your Ghost credentials
const api = new GhostContentAPI({
  url: 'https://andys-blog.ghost.io', // Your Ghost blog URL
  key: '598617e105a5ecb2c48db9039e',  // Your provided API key
  version: 'v5.0'
});

export default api;