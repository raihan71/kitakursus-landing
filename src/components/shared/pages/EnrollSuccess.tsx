import { illustrate, images } from '../../../configs/image';
import { useTranslation } from 'react-i18next';

const EnrollSuccess = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 pb-24">
      <div className="bg-white border border-gray-100 rounded-xl p-4 text-sm text-gray-600 w-auto mx-auto shadow">
        <div className="flex flex-col items-center justify-center py-8">
          <img
            src={images.logo_white}
            alt="logo"
            width={100}
            height={100}
            className={`transition-all duration-300 w-36 mb-10`}
          />
          <img
            src={illustrate.payment}
            alt="Enroll Success"
            className="w-48 h-48 object-contain mb-6"
          />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">
            {t('enroll_success')}
          </h2>
          <p className="text-gray-600 text-center mb-4">
            {t('enroll_success_caption')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnrollSuccess;
