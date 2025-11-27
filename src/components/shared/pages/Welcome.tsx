import { useTranslation } from 'react-i18next';
import {
  Navbar,
  Hero,
  Footer,
  Service,
  Program,
  WhyChooseUs,
  CTA,
} from '../../shared/elements/';

const Welcome = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Hero translate={t} />
        <WhyChooseUs translate={t} />
      </div>
      <div className="gradient-bg-services">
        <Program translate={t} />
      </div>
      <Service translate={t} />
      <div className="bg-gradient-to-b from-gray-900 via-black to-black">
        <CTA translate={t} />
      </div>
      <Footer />
    </div>
  );
};

export default Welcome;
