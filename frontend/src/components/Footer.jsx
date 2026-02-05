import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 px-6 md:px-12 py-12 relative overflow-hidden">

      {/* Decorative Circles */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 -right-16 w-52 h-52 bg-purple-300/20 rounded-full blur-3xl"></div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-[3fr_1fr_1fr] gap-12 mb-10">
        
        {/* Left Section */}
        <div className="flex flex-col md:flex-row items-start gap-4">
          <img className="w-28 mt-1" src={assets.logo} alt="Appointy Logo" />
          <p className="leading-6 md:max-w-[75%] text-gray-600 dark:text-gray-400">
            <strong>Appointy – Effortless Healthcare Scheduling</strong> <br />
            Patients can instantly book appointments with trusted doctors—from routine check-ups to specialist care—in just a few clicks. Our smart reminders keep appointments on track, while real-time updates ensure seamless coordination. Designed for modern healthcare, we save time for both patients and providers.
          </p>
        </div>

        {/* Middle Section */}
        <div>
          <p className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600 dark:text-gray-400">
            <li className="hover:text-blue-500 cursor-pointer transition-colors">Home</li>
            <li className="hover:text-blue-500 cursor-pointer transition-colors">About Us</li>
            <li className="hover:text-blue-500 cursor-pointer transition-colors">Contact Us</li>
            <li className="hover:text-blue-500 cursor-pointer transition-colors">Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600 dark:text-gray-400">
            <li className="hover:text-blue-500 transition-colors cursor-pointer">+91-90000-90000</li>
            <li className="hover:text-blue-500 transition-colors cursor-pointer">customersupport@appointy.in</li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <hr className="border-gray-300 dark:border-gray-700 mb-4" />
      <p className="text-sm text-center text-gray-500 dark:text-gray-400">
        © 2026 appointment.in — All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
