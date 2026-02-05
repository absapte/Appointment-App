import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <section className="my-20 px-4 sm:px-6">
      <div
        className="
          relative
          max-w-7xl mx-auto
          flex flex-col md:flex-row items-center
          bg-gradient-to-br from-indigo-50 via-white to-indigo-100
          rounded-3xl
          px-6 sm:px-10 lg:px-16
          py-12 sm:py-16
          overflow-hidden
        "
      >

        {/* LEFT CONTENT */}
        <div className="flex-1 text-center md:text-left">
          <h1
            className="
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl
              font-semibold
              leading-tight
              text-gray-900
              max-w-xl
              mx-auto md:mx-0
            "
          >
            Book Appointment <br />
            <span className="text-indigo-600 font-bold">
              With Trusted Doctors
            </span>
          </h1>

          <p
            className="
              mt-4
              text-gray-600
              text-sm sm:text-base md:text-lg
              max-w-md
              mx-auto md:mx-0
            "
          >
            Connect with verified healthcare professionals and book appointments
            effortlessly.
          </p>

          <button
            onClick={() => {
              navigate('/login')
              window.scrollTo(0, 0)
            }}
            className="
              mt-7
              inline-flex items-center justify-center
              bg-indigo-600
              text-white
              font-medium
              px-7 py-3
              rounded-full
              shadow-sm
              hover:shadow-md
              hover:-translate-y-0.5
              transition-all duration-300
            "
          >
            Create Account
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden md:flex flex-1 justify-end">
          <img
            src={assets.appointment_img}
            alt="Doctor Appointment"
            className="w-full max-w-sm lg:max-w-md"
          />
        </div>

        {/* VERY SOFT DECOR */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl"></div>

      </div>
    </section>
  )
}

export default Banner
