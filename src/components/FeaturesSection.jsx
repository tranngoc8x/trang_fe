import { productService } from '@/services/appService';
import { useState, useEffect } from 'react';

const FeatureSkeleton = () => (
  <div className="feature-card">
    <div className="feature-icon">
      <div className="skeleton skeleton-img"></div>
    </div>
    <div className="skeleton skeleton-text" style={{ width: '60%', height: '1.5rem', margin: '0 auto 1rem' }}></div>
    <div className="skeleton skeleton-text"></div>
    <div className="skeleton skeleton-text" style={{ width: '80%' }}></div>
  </div>
);

const FeaturesSection = ({ service }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getProducts(
          {
            populate: '*',
            'pagination[limit]': 3,
            filters: { 'show_in_home': true },
          }
        );
        setServices(response.data || []);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="features-section">
      <div className="container">
        <div className="section-title">
          <h2>{service?.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: service?.description }}></p>
        </div>

        <div className="features-grid">
          {loading ? (
            <>
              <FeatureSkeleton />
              <FeatureSkeleton />
              <FeatureSkeleton />
            </>
          ) : (
            services.map((feature) => (
              <div key={feature.id} className="feature-card">
                <div className="feature-icon">
                  {feature?.image || feature?.image?.url ? (
                    <img
                      src={'https://assets.kachivina.vn' + feature?.image?.url}
                      alt={feature?.title || 'Sản phẩm'}
                      className="w-full h-40 object-cover rounded mb-4"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded mb-4 text-gray-400"></div>
                  )}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))
          )}
        </div>

        <div className="learn-more-btn">
          <a href="/san-pham-dich-vu" className="btn btn-outline">
            Xem thêm
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
