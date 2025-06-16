/**
 * Loading Screen Component
 * Hiển thị khi ứng dụng đang load global configuration
 */

import React from 'react';

const LoadingScreen = ({ message = 'Đang tải cấu hình...', showLogo = true }) => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo placeholder */}
        {showLogo && (
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}

        {/* Loading spinner */}
        <div className="mb-6">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>

        {/* Loading message */}
        <p className="text-gray-600 text-lg font-medium">{message}</p>
        
        {/* Progress dots */}
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

/**
 * Error Screen Component
 * Hiển thị khi có lỗi load global configuration
 */
export const ErrorScreen = ({ 
  error, 
  onRetry, 
  message = 'Không thể tải cấu hình website' 
}) => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Error icon */}
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-red-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          </div>
        </div>

        {/* Error message */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Oops! Có lỗi xảy ra
        </h2>
        <p className="text-gray-600 mb-2">{message}</p>
        
        {/* Error details */}
        {error && (
          <p className="text-sm text-gray-500 mb-6 bg-gray-50 p-3 rounded">
            {error}
          </p>
        )}

        {/* Action buttons */}
        <div className="space-y-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Thử lại
            </button>
          )}
          
          <button
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Tải lại trang
          </button>
        </div>

        {/* Help text */}
        <p className="text-xs text-gray-400 mt-6">
          Nếu vấn đề vẫn tiếp tục, vui lòng liên hệ hỗ trợ kỹ thuật
        </p>
      </div>
    </div>
  );
};

/**
 * Maintenance Screen Component
 * Hiển thị khi website đang trong chế độ bảo trì
 */
export const MaintenanceScreen = ({ 
  message = 'Website đang được bảo trì',
  estimatedTime = ''
}) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center z-50">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Maintenance icon */}
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-orange-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
          </div>
        </div>

        {/* Maintenance message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          🚧 Đang bảo trì
        </h2>
        <p className="text-gray-600 mb-4">{message}</p>
        
        {estimatedTime && (
          <p className="text-sm text-gray-500 mb-6">
            Thời gian dự kiến: {estimatedTime}
          </p>
        )}

        {/* Progress animation */}
        <div className="mb-6">
          <div className="flex justify-center space-x-1">
            <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>

        {/* Contact info */}
        <div className="bg-white bg-opacity-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            Cần hỗ trợ khẩn cấp? Liên hệ với chúng tôi:
          </p>
          <p className="text-sm font-medium text-gray-800 mt-1">
            📧 support@example.com | 📞 0123-456-789
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
