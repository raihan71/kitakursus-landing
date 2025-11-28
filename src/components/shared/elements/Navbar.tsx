import React from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import type { NavbarItemProps } from '../../../types/NavbarItemProps';
import { images } from '../../../configs/image';
import { menus } from '../../../configs/menu';
import SwitcherLanguage from './SwitcherLanguage';

const NavBarItem = ({ title, classprops }: NavbarItemProps) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  const { t } = useTranslation();

  const [toggleMenu, setToggleMenu] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className={`w-full flex md:justify-center justify-between items-center transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'md:fixed md:mx-auto md:mt-2 left-0 right-0 z-50 py-3 md:px-6 md:backdrop-blur-lg md:bg-neutral-50/10 md:max-w-6xl border-b border-white/20 shadow-lg md:rounded-2xl'
          : 'relative py-4 px-4'
      }`}
    >
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img
          src={images.logo_white}
          alt="logo"
          width={100}
          height={100}
          className={`cursor-pointer transition-all duration-300 w-36`}
        />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {menus.map((item, index) => (
          <NavBarItem key={index} title={t(item.titleKey)} />
        ))}
        <SwitcherLanguage />
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        )}
        {toggleMenu && (
          <div className="z-10 fixed -top-0 -right-2 w-auto shadow-2xl md:hidden flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in">
            <div className="mt-2 flex flex-col justify-start items-end">
              <SwitcherLanguage />
            </div>
            <ul
              className="w-[70vw] h-screen p-3 list-none flex flex-col justify-start items-end
            "
            >
              <li className="text-xl w-full my-2">
                <AiOutlineClose onClick={() => setToggleMenu(false)} />
              </li>
              {menus.map((item, index) => (
                <NavBarItem
                  key={index}
                  title={t(item.titleKey)}
                  classprops="my-2 text-lg"
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
