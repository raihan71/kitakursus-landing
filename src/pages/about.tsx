import { useTranslation } from 'react-i18next';
import { Navbar, Footer } from '../components/shared/elements';

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
      </div>
      <div className="gradient-bg-services">
        <div className="flex flex-col items-center justify-center mx-auto h-[465px]">
          <h1 className="text-4xl font-bold text-white">{t('about_title')}</h1>
          <p className="w-2/5 mt-4 text-lg break-words text-wrap text-white">
            {t('about_subtitle')}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
