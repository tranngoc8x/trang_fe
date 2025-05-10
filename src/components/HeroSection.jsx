// React imports
import heroImage from '../assets/images/hero-illustration.svg';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// Import required modules
import { Autoplay, Pagination } from 'swiper/modules';

// Swiper styles are now in styles.css

const HeroSection = () => {
  // Dữ liệu slides
  const slides = [
    {
      id: 1,
      title: 'Lessons and insights',
      titleSpan: 'from 8 years',
      description: 'Where to grow your business as a photographer: site or social media?',
      buttonText: 'Register',
      buttonLink: '/register',
      image: heroImage
    },
    {
      id: 2,
      title: 'Build your business',
      titleSpan: 'with our tools',
      description: 'Discover how our platform can help you reach more customers and grow your brand.',
      buttonText: 'Learn More',
      buttonLink: '/learn-more',
      image: heroImage
    },
    {
      id: 3,
      title: 'Take your career',
      titleSpan: 'to the next level',
      description: 'Join thousands of professionals who have transformed their business with our solutions.',
      buttonText: 'Get Started',
      buttonLink: '/get-started',
      image: heroImage
    }
  ];

  return (
    <section className="hero-section">
      <div className="container">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: false,
          }}
          navigation={false}
          modules={[Autoplay, Pagination]}
          className="hero-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="hero-content">
                {/* Text Content */}
                <div className="hero-text">
                  <h1>
                    {slide.title} <span>{slide.titleSpan}</span>
                  </h1>
                  <p>
                    {slide.description}
                  </p>
                  <a
                    href={slide.buttonLink}
                    className="btn btn-primary"
                  >
                    {slide.buttonText}
                  </a>
                </div>

                {/* Hero Image */}
                <div className="hero-image">
                  <img
                    src={slide.image}
                    alt="Business growth illustration"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HeroSection;
