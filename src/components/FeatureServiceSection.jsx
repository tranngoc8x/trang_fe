import { serviceService } from '@/services/appService';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

const FeaturesServiceSection = ({ service }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await serviceService.getServices(
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

        <div className="blog-grid">
          {loading ? (
            <>
              <FeatureSkeleton />
              <FeatureSkeleton />
              <FeatureSkeleton />
            </>
          ) :
            services.map((feature) => (
              <Link to={`/san-pham-dich-vu/${feature.slug}`} key={feature.id} className="feature-card" style={{ textDecoration: 'none' }}>
                <div className="blog-image" style={{ backgroundImage: `url('https://assets.kachivina.vn${feature?.image?.url}')` }}>
                  <div className="blog-icon" style={{ color: feature.color }}>
                    {feature.icon}
                  </div>
                </div>

                <div className="blog-content">
                  <div className="blog-info">
                    <h3 className="blog-title">{feature.title}</h3>
                    <p className="blog-date">{feature.description}</p>
                  </div>
                  <Link to={`/san-pham-dich-vu/${feature.slug}`} className="btn btn-primary">
                    Xem chi tiết
                  </Link>

                </div>
              </Link>
            )
            )
          }
        </div>

        <div className="learn-more-btn">
          <a href="/san-pham-dich-vu" className="btn btn-outline">
            Xem thêm
          </a>
        </div>
      </div >
    </section >
  );
};

export default FeaturesServiceSection;
