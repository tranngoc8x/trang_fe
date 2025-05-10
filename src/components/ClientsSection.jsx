// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// Import required modules
import { Autoplay, Pagination } from 'swiper/modules';
// Import React hooks
import { useState, useEffect } from 'react';
// Import services
import { clientService } from '@services/appService';

const ClientsSection = () => {
  // State for clients data
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch clients data from API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const {data} = await clientService.getClients({populate:'logo'});

        if (data) {
          setClients(data);
        }
      } catch (err) {
        console.error('Error fetching clients:', err);
        setError('Failed to load clients data');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <section className="clients-section">
      <div className="container">
        <div className="section-title">
          <h2>Our Clients</h2>
          <p>
            We have been working with some Fortune 500+ clients
          </p>
        </div>

        {/* Client logos slider */}
        <div className="clients-slider">
          <style>
            {`
              .clients-swiper .swiper-pagination-bullet {
                width: 10px !important;
                height: 10px !important;
                background-color: #89939E !important;
                opacity: 0.7 !important;
                margin: 0 5px !important;
              }
              .clients-swiper .swiper-pagination-bullet-active {
                width: 13px !important;
                height: 13px !important;
                background-color: #4CAF4F !important;
                opacity: 1 !important;
                box-shadow: 0 0 3px rgba(76, 175, 79, 0.7) !important;
              }
              .clients-swiper .swiper-pagination {
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                margin-top: 15px !important;
              }
            `}
          </style>
          {loading ? (
            <div className="loading-container">
              <p>Loading clients...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p>{error}</p>
            </div>
          ) : clients.length === 0 ? (
            <div className="empty-container">
              <p>No clients found</p>
            </div>
          ) : (
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 40,
                },
                1224: {
                  slidesPerView: 8,
                  spaceBetween: 40,
                },
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, Pagination]}
              className="clients-swiper"
            >
              {clients.map((client) => (
                <SwiperSlide key={client.id}>
                  <div className="client-logo d-flex justify-content-center align-items-center flex-row">
                    {client && client.logo && client.logo.url ? (
                      <img
                        src={`http://localhost:1337${client?.logo.url}`}
                        alt={client?.title || 'Client logo'}
                        className="client-image"
                      />
                    ) :null}
                      <div className="client-logo-placeholder">
                        <span>{client ? client.title : 'Client'}</span>
                      </div>
                    
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
