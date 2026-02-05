import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <section
      id="speciality"
      className="w-full px-4 sm:px-6 lg:px-8 py-16 text-[#262626]"
    >
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Find by Speciality
        </h1>
        <p className="mt-3 text-sm sm:text-base text-gray-600">
          Simply browse through our extensive list of trusted doctors, schedule
          your appointment hassle-free.
        </p>
      </div>

      {/* Mobile Scroll | Desktop Grid */}
      <div
        className="
          mt-10
          flex gap-5 overflow-x-auto pb-4
          sm:grid sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-6
          sm:gap-6
          sm:overflow-visible
        "
      >
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            onClick={() => window.scrollTo(0, 0)}
            className="
              flex flex-col items-center
              min-w-[90px] sm:min-w-0
              cursor-pointer
              transition-transform duration-300
              hover:-translate-y-2
            "
          >
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-[#F5F7FF] flex items-center justify-center shadow-sm">
              <img
                src={item.image}
                alt={item.speciality}
                className="w-10 sm:w-14 object-contain"
              />
            </div>
            <p className="mt-2 text-xs sm:text-sm text-center font-medium">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default SpecialityMenu
