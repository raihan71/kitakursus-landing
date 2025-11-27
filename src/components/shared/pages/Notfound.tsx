import { useNavigate } from 'react-router-dom';
import type { NotFoundProps } from '../../../types/NotFoundProps';

const Notfound = ({ title, caption, destination }: NotFoundProps) => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-8">{caption}</p>
        <button
          onClick={() => navigate(destination || '/')}
          className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
};

export default Notfound;
