import { Link } from 'react-router-dom';
import heroImage from '../../assets/images/hero-illustration.png';

const HeroSection = () => {
  return (
    <section className="bg-light py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-36 flex flex-col md:flex-row items-center gap-16">
        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-600 leading-tight">
              Lessons and insights <span className="text-primary">from 8 years</span>
            </h1>
            <p className="text-lg text-gray-500">
              Where to grow your business as a photographer: site or social media?
            </p>
          </div>
          <Link 
            to="/register" 
            className="inline-block btn btn-primary"
          >
            Register
          </Link>
        </div>
        
        {/* Hero Image */}
        <div className="w-full md:w-1/2">
          <img 
            src={heroImage} 
            alt="Business growth illustration" 
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
