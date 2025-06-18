import React from 'react'

const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
    <div className="max-w-4xl mx-auto">
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-300 rounded w-1/2 sm:w-1/3"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-36 bg-gray-300 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default LoadingSpinner