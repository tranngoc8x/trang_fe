// React imports
import { useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// Import required modules
import { Autoplay, Pagination } from 'swiper/modules';
// Import services
import { slideService } from '@services/appService';

// Import Swiper styles directly in component to ensure they are applied
import '../styles.css';

const HeroSection = () => {
  // Default slides data as fallback


  // State for slides data
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch slides data from API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setLoading(true);
        const response = await slideService.getSlides({populate: 'image'});

        if (response && response.data && response.data.length > 0) {
          setSlides(response.data);
        }
      } catch (err) {
        console.error('Error fetching slides:', err);
        // Fallback to default slides on error is automatic since we initialized with defaultSlides
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);



  // Using inline styles directly in the component

  return (
    <section className="hero-section">
      <style>
        {`
          .swiper-pagination-bullet {
            width: 10px !important;
            height: 10px !important;
            background-color: #89939E !important;
            opacity: 0.7 !important;
            margin: 0 5px !important;
          }
          .swiper-pagination-bullet-active {
            width: 13px !important;
            height: 13px !important;
            background-color: #4CAF4F !important;
            opacity: 1 !important;
            box-shadow: 0 0 3px rgba(76, 175, 79, 0.7) !important;
          }
          .swiper-pagination {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            margin-top: 15px !important;
          }
        `}
      </style>
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
          {loading ? (
            <SwiperSlide className='relative'>
              <div className="hero-content h-full flex justify-center items-center">
                <p className="text-gray-500">Loading slides...</p>
              </div>
            </SwiperSlide>
          ) : (
            slides.map((slide) => (
              <SwiperSlide key={slide.id} className='relative'>
                <div
                  className="hero-content h-full"
                  style={{
                    backgroundImage: `url(${slide?.image.url ? 'http://localhost:1337' + slide.image.url : ''})`,
                    backgroundSize: 'contain',
                    backgroundPosition: `${slide?.position[0] || 'center'} center`,
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {/* Text Content */}
                  <div className="absolute top-0 left-0 h-full w-full flex items-center" dangerouslySetInnerHTML={{__html: slide.content}} />
                

                  {/* Hero Image - Hidden but keeping for reference */}
                  <div className="hero-image opacity-0">
                    <img
                      src={slide?.image.url ? 'http://localhost:1337' + slide.image.url : ''}
                      alt="Business growth illustration"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default HeroSection;
