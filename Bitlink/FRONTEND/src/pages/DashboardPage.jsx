import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from '@tanstack/react-router'
import { logout } from '../store/slice/authSlice.js'
import { logoutUser } from '../api/user.api'
import UrlForm from '../components/UrlForm'
import UserUrl from '../components/UserUrl'

const DashboardPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      // Call backend logout API
      await logoutUser()
      
      // Clear Redux state
      dispatch(logout())
      
      // Redirect to home page
      navigate({ to: '/' })
      
      console.log("Logout success")
    } catch (error) {
      console.error("Logout failed:", error)
      // Even if API fails, still logout from frontend
      dispatch(logout())
      navigate({ to: '/' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white -mt-20 p-8 rounded-lg shadow-md w-full max-w-4xl relative">
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Logout
        </button>
        
        <h1 className="text-2xl font-bold text-center mb-6">Bitlink</h1>
        <UrlForm/>
        <UserUrl/>
      </div>
    </div>
  )
}

export default DashboardPage