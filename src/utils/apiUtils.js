/**
 * Utility functions for API calls with language support
 */

/**
 * Add language parameter to API request parameters
 * @param {Object} params - Original parameters
 * @param {string} language - Current language (vi/en)
 * @returns {Object} Parameters with language added
 */
export const addLanguageToParams = (params = {}, language = 'vi') => {
  // If API supports locale parameter
  return {
    ...params,
    locale: language
  };
};

/**
 * Get language-specific menu ID
 * @param {string} baseMenuId - Base menu ID
 * @param {string} language - Current language
 * @returns {string} Language-specific menu ID
 */
export const getLanguageMenuId = (baseMenuId, language = 'vi') => {
  // For now, use the same menu ID for both languages
  // In the future, you might have separate menu IDs for each language
  return baseMenuId;
};

/**
 * Transform API response based on language
 * @param {Object} response - API response
 * @param {string} language - Current language
 * @returns {Object} Transformed response
 */
export const transformResponseForLanguage = (response, language = 'vi') => {
  // Add any language-specific transformations here
  // For example, filtering content by language or formatting dates
  return response;
};

/**
 * Get fallback content for missing translations
 * @param {Object} content - Content object
 * @param {string} language - Current language
 * @param {string} fallbackLanguage - Fallback language
 * @returns {Object} Content with fallback
 */
export const getContentWithFallback = (content, language = 'vi', fallbackLanguage = 'vi') => {
  if (!content) return content;
  
  // If content has language-specific fields
  if (content[language]) {
    return content[language];
  }
  
  // Fallback to default language
  if (content[fallbackLanguage]) {
    return content[fallbackLanguage];
  }
  
  // Return original content if no language-specific version exists
  return content;
};
