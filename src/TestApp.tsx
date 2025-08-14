import React from 'react'

const TestApp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Gaurav Guddeti
        </h1>
        <p className="text-xl text-gray-600 text-center mb-8">
          Developer & AI Enthusiast
        </p>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🧪 Tailwind CSS Test
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">Colors Work</h3>
              <p className="text-blue-600">If you see this styled, Tailwind is working!</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">Layout Works</h3>
              <p className="text-green-600">Grid system is functioning properly.</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Gradients & Styling</h2>
          <p className="text-lg opacity-90">
            If this looks colorful and styled, we're good to go!
          </p>
        </div>
      </div>
    </div>
  )
}

export default TestApp
