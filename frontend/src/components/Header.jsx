import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <header className="relative flex flex-col md:flex-row items-center md:items-start bg-white rounded-2xl px-4 sm:px-8 md:px-12 lg:px-20 py-24 md:py-32 shadow-lg mt-24 md:mt-28">

      {/* Decorative Background */}
      <div className="absolute -top-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-blue-100/50 rounded-full blur-3xl hidden sm:block"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 sm:w-52 sm:h-52 bg-purple-100/50 rounded-full blur-3xl hidden sm:block"></div>

      {/* Left Hero Content */}
      <div className="md:w-1/2 flex flex-col items-center md:items-start gap-6 text-center md:text-left z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
          Book Appointment <br className="hidden sm:block"/> With Trusted Doctors
        </h1>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-gray-600 text-sm sm:text-base font-light justify-center md:justify-start">
          <img className="w-24 sm:w-28" src={assets.group_profiles} alt="Profiles" />
          <p className="max-w-md">
            Browse our list of trusted doctors, <br className="hidden sm:block"/>
            and schedule your appointment hassle-free.
          </p>
        </div>
        <a
          href="#speciality"
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 sm:px-8 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition-all duration-300 mt-4"
        >
          Book Appointment <img className="w-4" src={assets.arrow_icon} alt="Arrow Icon" />
        </a>
      </div>

      {/* Right Hero Image */}
      <div className="md:w-1/2 relative mt-8 md:mt-0 flex justify-center md:justify-end z-10">
        <img
          className="w-full max-w-md sm:max-w-lg md:max-w-full h-auto rounded-2xl shadow-2xl"
          src={assets.header_img}
          alt="Doctors"
        />
      </div>
    </header>
  );
};

export default Header;
