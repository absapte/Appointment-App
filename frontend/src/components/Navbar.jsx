import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const { token, setToken, userData } = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 w-full h-20 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 md:px-10 flex items-center justify-between">

          {/* Logo */}
          <div onClick={() => navigate('/')} className="cursor-pointer">
            <img
              src={assets.logo}
              alt="logo"
              className="w-20 sm:w-24 object-contain"
            />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6 font-medium text-gray-700">
            <NavLink to="/" className="hover:text-purple-500">HOME</NavLink>
            <NavLink to="/doctors" className="hover:text-purple-500">ALL DOCTORS</NavLink>
            <NavLink to="/about" className="hover:text-purple-500">ABOUT</NavLink>
            <NavLink to="/contact" className="hover:text-purple-500">CONTACT</NavLink>
          </ul>

          {/* Right */}
          <div className="flex items-center gap-3">

            {token && userData ? (
              <div className="relative group">
                <div className="flex items-center gap-2 cursor-pointer">
                  <img
                    src={userData.image}
                    className="w-9 h-9 rounded-full border"
                    alt=""
                  />
                  <img src={assets.dropdown_icon} className="w-3" />
                </div>

                <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                  <p onClick={() => navigate('/my-profile')} className="cursor-pointer hover:text-purple-500">My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className="cursor-pointer hover:text-purple-500">Appointments</p>
                  <p onClick={logout} className="cursor-pointer text-red-500">Logout</p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="hidden sm:block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm"
              >
                Create Account
              </button>
            )}

            {/* Mobile Menu Icon */}
            <button onClick={() => setShowMenu(true)} className="md:hidden">
              <img src={assets.menu_icon} className="w-7" />
            </button>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE DRAWER ===== */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg transform ${showMenu ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
        <div className="flex items-center justify-between px-5 py-6 border-b">
          <img src={assets.logo} className="w-28" />
          <button onClick={() => setShowMenu(false)}>
            <img src={assets.cross_icon} className="w-6" />
          </button>
        </div>

        <ul className="flex flex-col gap-4 px-5 mt-6 font-medium text-gray-700">
          <NavLink onClick={() => setShowMenu(false)} to="/">HOME</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/doctors">ALL DOCTORS</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/about">ABOUT</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/contact">CONTACT</NavLink>
        </ul>
      </div>
    </>
  )
}

export default Navbar
