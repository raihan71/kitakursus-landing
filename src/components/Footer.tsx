import { images } from '../configs/image';

const Footer = () => (
  <footer className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-[0.5] justify-center items-center">
        <img src={images.logo_white} alt="logo" className="w-44" />
      </div>
      <div className="flex flex-col md:flex-row flex-1 justify-around items-center flex-wrap sm:mt-0 mt-5 w-full">
        <div className="flex flex-row gap-6 sm:gap-12 items-center">
          <div className="flex flex-col text-white">
            <span className="font-semibold mb-2">Explore</span>
            <a className="text-gray-300 text-sm hover:text-white cursor-pointer">
              Market
            </a>
            <a className="text-gray-300 text-sm hover:text-white cursor-pointer">
              Exchange
            </a>
            <a className="text-gray-300 text-sm hover:text-white cursor-pointer">
              Wallets
            </a>
          </div>

          <div className="flex flex-col text-white">
            <span className="font-semibold mb-2">Resources</span>
            <a className="text-gray-300 text-sm hover:text-white cursor-pointer">
              Tutorials
            </a>
            <a className="text-gray-300 text-sm hover:text-white cursor-pointer">
              Docs
            </a>
            <a className="text-gray-300 text-sm hover:text-white cursor-pointer">
              FAQ
            </a>
          </div>
          <div className="flex flex-col text-white">
            <span className="font-semibold mb-2">Support</span>
            <a className="text-gray-300 text-sm hover:text-white cursor-pointer">
              Help Center
            </a>
            <a className="text-gray-300 text-sm hover:text-white cursor-pointer">
              Terms of Service
            </a>
            <a className="text-gray-300 text-sm hover:text-white cursor-pointer">
              Privacy Policy
            </a>
          </div>
          <div className="flex flex-col text-white">
            <span className="font-semibold mb-2">Company</span>
            <a className="text-gray-300 text-sm hover:text-white cursor-pointer">
              About Us
            </a>
            <a className="text-gray-300 text-sm hover:text-white cursor-pointer">
              Careers
            </a>
            <a className="text-gray-300 text-sm hover:text-white cursor-pointer">
              Contact
            </a>
          </div>
        </div>

        {/* Social + CTA */}
        <div className="flex flex-col items-center sm:items-end gap-8 md:gap-4">
          <div className="flex mt-5 md:mt-0 space-x-6 md:space-x-3">
            {/* Twitter */}
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-300 hover:text-white">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="transition-colors">
                <path d="M22 5.92c-.66.3-1.37.5-2.12.6a3.7 3.7 0 0 0 1.62-2.04 7.35 7.35 0 0 1-2.34.9 3.68 3.68 0 0 0-6.27 3.36A10.45 10.45 0 0 1 3.16 4.9a3.68 3.68 0 0 0 1.14 4.91 3.62 3.62 0 0 1-1.67-.46v.05a3.68 3.68 0 0 0 2.95 3.61c-.48.13-.98.2-1.5.08a3.69 3.69 0 0 0 3.44 2.56A7.38 7.38 0 0 1 2 18.57a10.4 10.4 0 0 0 5.63 1.65c6.76 0 10.46-5.6 10.46-10.46v-.48A7.4 7.4 0 0 0 22 5.92z" />
              </svg>
            </a>

            {/* Telegram */}
            <a
              href="#"
              aria-label="Telegram"
              className="text-gray-300 hover:text-white">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path d="M21 3L3 10.5l4 1.5L9 21l3.5-2 3.5 2 1.5-6 4-10.5zM10 14.5l-.9-3.6L18 6 10 14.5z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="#"
              aria-label="GitHub"
              className="text-gray-300 hover:text-white">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.6-1.4-1.5-1.8-1.5-1.8-1.2-.8.1-.8.1-.8 1.3.1 2 1.3 2 1.3 1.2 2 3.2 1.4 4 .9.1-.8.5-1.4.9-1.8-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.3-3.3-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.3 1.3a11.4 11.4 0 0 1 6 0C17.8 4 18.8 4.3 18.8 4.3c.7 1.7.2 3 .1 3.3.8.9 1.3 2 1.3 3.3 0 4.5-2.7 5.5-5.3 5.8.5.4.9 1.1.9 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z" />
              </svg>
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded-md bg-gray-800 text-gray-200 text-sm focus:outline-none"
            />
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

    <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
      <p className="text-white text-left text-xs">Copyright © Kitakursus</p>
      <p className="text-white text-right text-xs">
        Since 2018. All rights reserved
      </p>
    </div>
  </footer>
);

export default Footer;
