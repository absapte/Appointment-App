import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <section className="px-4 sm:px-8 md:px-12 py-12">

      {/* Heading */}
      <div className="text-center text-2xl sm:text-3xl font-medium text-gray-700">
        CONTACT <span className="font-semibold text-gray-900">US</span>
      </div>

      {/* Content */}
      <div className="mt-12 flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto mb-24">

        {/* Image */}
        <img
          src={assets.contact_image}
          alt="contact"
          className="w-full max-w-sm md:max-w-[380px] rounded-xl shadow-md"
        />

        {/* Text */}
        <div className="flex flex-col gap-6 text-sm sm:text-base text-gray-600">

          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-1">
              OUR OFFICE
            </h3>
            <p>
              54709 Shivaji Nagar <br />
              Pune, 411011
            </p>
          </div>

          <div>
            <p>
              Tel: (415) 555-0132 <br />
              Email: customersupport@appointy.in
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-1">
              CAREERS AT APPOINTY
            </h3>
            <p>
              Learn more about our teams and current job openings.
            </p>
          </div>

          <button
            className="w-fit border border-gray-800 px-8 py-3 rounded-md text-sm sm:text-base hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            Explore Jobs
          </button>

        </div>
      </div>
    </section>
  )
}

export default Contact
