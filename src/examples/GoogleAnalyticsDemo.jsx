/**
 * Google Analytics Demo Component
 * Hướng dẫn cách sử dụng Google Analytics với mã G-G62WZE9GG8
 */

import React from 'react';
import { useGoogleAnalytics } from '../hooks/useGoogleAnalytics';
import { 
  trackButtonClick, 
  trackFormSubmit, 
  trackDownload,
  trackExternalLink,
  trackSearch,
  trackContact,
  trackLanguageChange
} from '../seo';

const GoogleAnalyticsDemo = () => {
  const {
    trackEvent,
    trackCustomEvent,
    trackClick,
    trackScrollDepth,
    trackEngagement,
    trackVideoPlay,
    setUserProperties
  } = useGoogleAnalytics();

  // Demo functions
  const handleButtonClick = () => {
    trackButtonClick('demo_button', 'analytics_demo');
    // Hoặc sử dụng hook
    trackClick('demo_button_hook', 'button');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    trackFormSubmit('demo_form');
    alert('Form submitted! Check Analytics for tracking.');
  };

  const handleDownload = () => {
    trackDownload('demo_file.pdf', 'pdf');
    // Simulate download
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,Demo file content';
    link.download = 'demo_file.txt';
    link.click();
  };

  const handleExternalLink = () => {
    trackExternalLink('https://google.com');
    window.open('https://google.com', '_blank');
  };

  const handleSearch = () => {
    const searchTerm = 'demo search';
    trackSearch(searchTerm, 5);
    alert(`Searched for: ${searchTerm}`);
  };

  const handleContact = () => {
    trackContact('email');
    alert('Contact tracked!');
  };

  const handleLanguageChange = () => {
    trackLanguageChange('vi', 'en');
    alert('Language change tracked!');
  };

  const handleVideoPlay = () => {
    trackVideoPlay('Demo Video', 120);
    alert('Video play tracked!');
  };

  const handleScrollTracking = () => {
    trackScrollDepth(50);
    alert('50% scroll depth tracked!');
  };

  const handleEngagement = () => {
    trackEngagement('demo_interaction', {
      interaction_type: 'button_click',
      element_id: 'engagement_demo'
    });
    alert('Engagement tracked!');
  };

  const handleCustomEvent = () => {
    trackCustomEvent('custom_action', 'demo_category', 'demo_label', 100);
    alert('Custom event tracked!');
  };

  const handleSetUserProperties = () => {
    setUserProperties({
      user_type: 'demo_user',
      preferred_language: 'vi',
      subscription_status: 'free'
    });
    alert('User properties set!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Google Analytics Demo</h1>
      <p className="text-gray-600 mb-8">
        Demo các tính năng tracking với Google Analytics ID: <code className="bg-gray-100 px-2 py-1 rounded">G-G62WZE9GG8</code>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Basic Tracking */}
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-semibold mb-3">Basic Tracking</h3>
          <div className="space-y-2">
            <button 
              onClick={handleButtonClick}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Track Button Click
            </button>
            <button 
              onClick={handleCustomEvent}
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Track Custom Event
            </button>
          </div>
        </div>

        {/* Form Tracking */}
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-semibold mb-3">Form Tracking</h3>
          <form onSubmit={handleFormSubmit} className="space-y-2">
            <input 
              type="text" 
              placeholder="Your name"
              className="w-full border rounded px-3 py-2"
            />
            <input 
              type="email" 
              placeholder="Your email"
              className="w-full border rounded px-3 py-2"
            />
            <button 
              type="submit"
              className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Submit Form
            </button>
          </form>
        </div>

        {/* File & Link Tracking */}
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-semibold mb-3">File & Link Tracking</h3>
          <div className="space-y-2">
            <button 
              onClick={handleDownload}
              className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Track Download
            </button>
            <button 
              onClick={handleExternalLink}
              className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Track External Link
            </button>
          </div>
        </div>

        {/* Search & Contact */}
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-semibold mb-3">Search & Contact</h3>
          <div className="space-y-2">
            <button 
              onClick={handleSearch}
              className="w-full bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
            >
              Track Search
            </button>
            <button 
              onClick={handleContact}
              className="w-full bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
              Track Contact
            </button>
          </div>
        </div>

        {/* Media & Engagement */}
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-semibold mb-3">Media & Engagement</h3>
          <div className="space-y-2">
            <button 
              onClick={handleVideoPlay}
              className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Track Video Play
            </button>
            <button 
              onClick={handleScrollTracking}
              className="w-full bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
            >
              Track Scroll Depth
            </button>
          </div>
        </div>

        {/* Advanced Tracking */}
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-semibold mb-3">Advanced Tracking</h3>
          <div className="space-y-2">
            <button 
              onClick={handleLanguageChange}
              className="w-full bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600"
            >
              Track Language Change
            </button>
            <button 
              onClick={handleEngagement}
              className="w-full bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600"
            >
              Track Engagement
            </button>
            <button 
              onClick={handleSetUserProperties}
              className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Set User Properties
            </button>
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Cách sử dụng</h2>
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-medium">1. Import hook:</h4>
            <code className="block bg-white p-2 rounded mt-1">
              import {`{ useGoogleAnalytics }`} from '../hooks/useGoogleAnalytics';
            </code>
          </div>
          <div>
            <h4 className="font-medium">2. Import tracking functions:</h4>
            <code className="block bg-white p-2 rounded mt-1">
              import {`{ trackButtonClick, trackFormSubmit }`} from '../seo';
            </code>
          </div>
          <div>
            <h4 className="font-medium">3. Sử dụng trong component:</h4>
            <code className="block bg-white p-2 rounded mt-1">
              const {`{ trackEvent, trackClick }`} = useGoogleAnalytics();
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleAnalyticsDemo;
