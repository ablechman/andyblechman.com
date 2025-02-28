// src/ghost.js
import GhostContentAPI from '@tryghost/content-api';

// Create API instance with your Ghost credentials
const api = new GhostContentAPI({
  url: 'https://andys-blog.ghost.io', 
  key: '598617e105a5ecb2c48db9039e',
  version: 'v5.0'
});

// Test function to check if the API is working
const testConnection = async () => {
  try {
    const posts = await api.posts.browse({ limit: 1 });
    console.log('Ghost API connection successful:', posts);
    return posts;
  } catch (err) {
    console.error('Ghost API connection error:', err);
    return null;
  }
};

// Call the test function immediately
testConnection();

export default api;