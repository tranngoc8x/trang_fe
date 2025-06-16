import React, { useState, useEffect } from 'react';
import { aboutService } from '@services/appService';

const About = () => {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const response = await aboutService.getAboutUses({
          sort: 'order:asc'
        });

        if (response && response.data) {
          setAboutData(response.data);
          console.log('About data:', response.data);
        }
      } catch (err) {
        console.error('Error fetching about data:', err);
        setError('Không thể tải dữ liệu về chúng tôi');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4 md:px-6 lg:px-36">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-700 mb-8 text-center">
            Về Chúng Tôi
          </h1>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Đang tải dữ liệu...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            aboutData && aboutData.map(about =>
              <div className="bg-white rounded-lg shadow-md p-8 mb-10">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: about.title }} />
                <div className="text-gray-600 mb-6" dangerouslySetInnerHTML={{ __html: about.content }}>
                </div>

              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
