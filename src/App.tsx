import {
  Navbar,
  Hero,
  Footer,
  Service,
  Program,
  WhyChooseUs,
} from './components';

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Hero />
        <WhyChooseUs />
      </div>
      <Program />
      <Service />
      <Footer />
    </div>
  );
};

export default App;
