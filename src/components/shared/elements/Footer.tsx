import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterCircle,
} from 'react-icons/ai';
import { images } from '../../../configs/image';
import { menusBottom } from '../../../configs/menu';

const socials = [
  {
    icon: AiFillTwitterCircle,
    link: 'https://twitter.com/kitakursus',
    label: 'Twitter',
  },
  {
    icon: AiFillInstagram,
    link: 'https://www.instagram.com/raihan.nismara',
    label: 'Instagram',
  },
  {
    icon: AiFillFacebook,
    link: 'https://www.facebook.com/kitakursus',
    label: 'Facebook',
  },
];

const Footer = () => (
  <footer className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-[0.5] justify-center items-center">
        <img src={images.logo_white} alt="logo" className="w-44" />
      </div>
      <div className="flex flex-col md:flex-row flex-1 justify-around items-center flex-wrap sm:mt-0 mt-5 w-full">
        <div className="flex flex-row gap-6 sm:gap-12 items-center">
          {menusBottom.map((item, index) => (
            <div className="flex flex-col text-white" key={index}>
              <span className="font-semibold mb-2">{item?.section}</span>
              {item.menus.map((menu, i) => (
                <a
                  href={menu.link}
                  key={i}
                  target="_blank"
                  className="text-gray-300 text-sm hover:text-white cursor-pointer"
                >
                  {menu.title}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Social + CTA */}
        <div className="flex flex-col items-center sm:items-end gap-8 md:gap-4">
          <div className="flex mt-5 md:mt-0 space-x-6 md:space-x-3">
            {/* Twitter */}
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.link}
                aria-label={social.label.toLowerCase()}
                target="_blank"
                className="text-gray-300 hover:text-white"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded-md bg-gray-800 text-gray-200 text-sm focus:outline-none"
            />
            <button className="px-4 py-2 bg-[#2952e3] hover:bg-[#2546bd] text-white rounded-md text-sm">
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
