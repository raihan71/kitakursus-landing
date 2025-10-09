import React from 'react';
import { programs } from '../configs/constants';

const Program = () => {
  return (
    <div className="flex w-full justify-center items-center gradient-bg-services">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            Program Tersedia
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Pilih program yang sesuai dengan minat dan tujuan karir kamu
          </p>
        </div>

        <div
          className={`grid gap-8 ${
            programs.length === 1
              ? 'grid-cols-1 justify-items-center'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
          {programs.map((item, index) => (
            <div
              key={index}
              className={`program-card white-glassmorphism rounded-2xl p-8 ${
                programs.length === 1 ? 'max-w-md' : ''
              }`}>
              <div className="icon-container w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#50c8b4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="tag text-xs px-3 py-1 rounded-full text-emerald-300">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gradient text-lg font-semibold">
                  {item.duration}
                </span>
                <button className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Program;
