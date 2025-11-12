import React, { useState } from 'react'
import LoginForm from "../components/LoginForm"
import UrlForm from "../components/UrlForm"

const HomePage = () => {
  const [currentView, setCurrentView] = useState('home')

  const handleGuestClick = () => {
    setCurrentView('urlForm')
  }

  const handleLoginClick = () => {
    setCurrentView('login')
  }

  const handleBackToHome = () => {
    setCurrentView('home')
  }

  // Home View
  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-12 rounded-2xl shadow-xl w-full max-w-lg">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">Bitlink</h1>
            <p className="text-gray-600">Shorten your links quickly and easily</p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={handleGuestClick}
              className="w-full bg-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Continue as Guest
            </button>
            
            <button
              onClick={handleLoginClick}
              className="w-full bg-white text-indigo-600 py-4 px-6 rounded-lg font-semibold text-lg border-2 border-indigo-600 hover:bg-indigo-50 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Login / Register
            </button>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Free and easy to use • No credit card required
            </p>
          </div>
        </div>
      </div>
    )
  }

  // URL Form View
  if (currentView === 'urlForm') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-12 rounded-2xl shadow-xl w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">Bitlink</h1>
            <p className="text-gray-600">Shorten your links quickly and easily</p>
          </div>
          
          <UrlForm />
          
          <button
            onClick={handleBackToHome}
            className="w-full mt-6 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold text-base hover:bg-gray-300 transition-all duration-200"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    )
  }

  // Login Form View
  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
        <LoginForm state={setCurrentView} />
        <button
          onClick={handleBackToHome}
          className="mt-4 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200"
        >
          ← Back to Home
        </button>
      </div>
    )
  }
}

export default HomePage