import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { images } from '../../../configs/image';

const NavbarDetail = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 py-1.5 z-50 bg-white/95 backdrop-blur shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition"
          aria-label="Back"
        >
          <AiOutlineArrowLeft className="text-2xl text-gray-800" />
        </button>
        <div className="flex items-center gap-4">
          <Link to="/">
            <img
              src={images.logo_white}
              alt="Kitakursus Logo"
              className="h-8 w-auto"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDetail;
