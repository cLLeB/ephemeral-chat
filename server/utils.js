/**
 * Utility functions for the Ephemeral Chat application
 */

/**
 * Generate a unique 6-character room code
 * @returns {string} 6-character alphanumeric code
 */
function generateRoomCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate a random nickname if user doesn't provide one
 * @returns {string} Random nickname
 */
function generateRandomNickname() {
  const adjectives = [
    'Anonymous', 'Mystery', 'Secret', 'Hidden', 'Phantom', 'Shadow',
    'Silent', 'Quiet', 'Swift', 'Clever', 'Bright', 'Quick'
  ];
  
  const animals = [
    'Panda', 'Tiger', 'Eagle', 'Wolf', 'Fox', 'Bear',
    'Lion', 'Hawk', 'Owl', 'Cat', 'Dog', 'Rabbit'
  ];
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const number = Math.floor(Math.random() * 999) + 1;
  
  return `${adjective}${animal}${number}`;
}

/**
 * Sanitize user input to prevent XSS
 * @param {string} input - User input to sanitize
 * @returns {string} Sanitized input
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove < and > characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .substring(0, 500); // Limit length
}

/**
 * Validate room code format
 * @param {string} code - Room code to validate
 * @returns {boolean} True if valid
 */
function isValidRoomCode(code) {
  return typeof code === 'string' && 
         code.length === 6 && 
         /^[A-Z0-9]+$/.test(code);
}

/**
 * Validate nickname format
 * @param {string} nickname - Nickname to validate
 * @returns {boolean} True if valid
 */
function isValidNickname(nickname) {
  return typeof nickname === 'string' && 
         nickname.length >= 1 && 
         nickname.length <= 20 &&
         /^[a-zA-Z0-9_\-\s]+$/.test(nickname);
}

/**
 * Get TTL options for message expiration
 * @returns {Object} TTL options with labels and values in seconds
 */
function getTTLOptions() {
  return {
    'none': 0,
    '30sec': 30,
    '1min': 60,
    '5min': 300,
    '30min': 1800,
    '1hour': 3600
  };
}

module.exports = {
  generateRoomCode,
  generateRandomNickname,
  sanitizeInput,
  isValidRoomCode,
  isValidNickname,
  getTTLOptions
};
