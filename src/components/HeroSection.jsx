import heroImage from '../assets/images/hero-illustration.svg';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          {/* Text Content */}
          <div className="hero-text">
            <h1>
              Lessons and insights <span>from 8 years</span>
            </h1>
            <p>
              Where to grow your business as a photographer: site or social media?
            </p>
            <a
              href="/register"
              className="btn btn-primary"
            >
              Register
            </a>
          </div>

          {/* Hero Image */}
          <div className="hero-image">
            <img
              src={heroImage}
              alt="Business growth illustration"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
