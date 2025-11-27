import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavbarDetail } from '../../components/shared/elements';
import Enroll from '../../components/shared/pages/Enroll';
import EnrollSuccess from '../../components/shared/pages/EnrollSuccess';

const EnrollCourse = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCompleted) return undefined;

    const timeout = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isCompleted, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {!isCompleted && <NavbarDetail />}
      {isCompleted ? (
        <EnrollSuccess />
      ) : (
        <Enroll
          onSuccess={() => {
            setIsCompleted(true);
          }}
        />
      )}
    </div>
  );
};

export default EnrollCourse;
