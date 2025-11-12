import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axiosInstance from '../utils/axiosInstance'

const UrlForm = () => {
  
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState()
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)
  const [customSlug, setCustomSlug] = useState("")
  const [loading, setLoading] = useState(false)
  
  // Get authentication state from Redux
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated || false)

  const handleSubmit = async () => {
    if (!url) {
      setError("Please enter a URL")
      return
    }

    setLoading(true)
    setError(null)
    
    try{
      const payload = { url }
      
      // Add custom slug only if user is authenticated and provided one
      if (isAuthenticated && customSlug) {
        payload.slug = customSlug
      }
      
      const { data } = await axiosInstance.post("/api/create", payload)
      setShortUrl(data.shortUrl)
      setError(null)
    }catch(err){
      setError(err.response?.data?.message || err.message || "Failed to create short URL")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="space-y-6">
        <div>
          <label htmlFor="url" className="block text-sm font-semibold text-gray-700 mb-2">
            Enter your URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onInput={(event)=>setUrl(event.target.value)}
            placeholder="https://example.com"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {isAuthenticated && (
          <div>
            <label htmlFor="customSlug" className="block text-sm font-semibold text-gray-700 mb-2">
              Custom URL (optional)
            </label>
            <input
              type="text"
              id="customSlug"
              value={customSlug}
              onChange={(event) => setCustomSlug(event.target.value)}
              placeholder="my-custom-link"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          type="submit"
          disabled={loading}
          className={`w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Creating...' : 'Shorten URL'}
        </button>

         {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {shortUrl && (
          <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Your shortened URL:</h2>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shortUrl}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg bg-white text-gray-700 font-medium"
              />
               <button
                onClick={handleCopy}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 ${
                  copied 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
  )
}

export default UrlForm