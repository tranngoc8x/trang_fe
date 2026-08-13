import { productService } from '@/services/appService';
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

const FeaturesProductSection = ({ service }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getProducts(
          {
            populate: '*',
            'pagination[limit]': 4,
            filters: { 'show_in_home': true },
          }
        );
        setProducts(response.data || []);
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
          <h2>Sản phẩm nổi bật</h2>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            <>
              <FeatureSkeleton />
              <FeatureSkeleton />
              <FeatureSkeleton />
              <FeatureSkeleton />
            </>
          ) : (
            products.map((feature) => (
              <Link to={`/san-pham/${feature.slug}`} key={feature.id} className="border overflow-hidden border-gray-100" style={{ textDecoration: 'none' }}>
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
                <h3 className="font-bold text-md px-4 py-2">{feature.title}</h3>
                <p className="px-4 pb-2 text-red-600 font-bold">
                  {feature?.price ? Number(feature.price).toLocaleString('vi-VN') + ' đ' : 'Liên hệ'}
                </p>
                <p className="px-4 pb-2 text-sm">Mã SP: <strong className="text-blue-600 font-bold">{feature?.sku}</strong>  </p>
                <button className="px-2 !py-1 mx-4 text-white bg-primary btn btn-outline rounded-sm ">Chi tiết</button>
              </Link>
            ))
          )}
        </div>

        <div className="learn-more-btn">
          <a href="/san-pham-dich-vu" className="btn btn-outline">
            Xem thêm
          </a>
        </div>
      </div>
    </section >
  );
};

export default FeaturesProductSection;
