import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useGlobalConfig } from '../contexts/GlobalConfigContext';
import { homePageService } from '@services/appService';
import HeroSection from '@/components/HeroSection';
import ClientsSection from '@/components/ClientsSection';
import FeaturesSection from '@/components/FeaturesSection';
import AboutSection from '@/components/AboutSection';
import AchievementSection from '@/components/AchievementSection';
import BlogSection from '@/components/BlogSection';

import SimpleSEOHead from '@/seo/components/SimpleSEOHead';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';


const HomePage = () => {
  const [homePageData, setHomePageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentLanguage } = useLanguage();
  const { getSiteDescription } = useGlobalConfig();
  const { trackScrollDepth } = useGoogleAnalytics();

  // Track scroll behavior
  useEffect(() => {
    const trackedThresholds = new Set();

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      [25, 50, 75, 100].forEach(threshold => {
        if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
          trackedThresholds.add(threshold);
          trackScrollDepth(threshold);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackScrollDepth]);



  useEffect(() => {
    const fetchHomePageContent = async () => {
      try {
        setLoading(true);
        const response = await homePageService.getHomePageContent({
          populate: {
            'partner': {
              populate: {
                'media': {
                  populate: '*'
                }
              }
            },
            'service': {
              populate: {
                'media': {
                  populate: '*'
                }
              }
            },
            'aboutus': {
              populate: {
                'media': {
                  populate: '*'
                }
              }
            },
            'news': {
              populate: {
                'media': {
                  populate: '*'
                }
              }
            },
            'company_achievement': {
              populate: {
                'items': {
                  populate: {
                    'media': {
                      populate: '*'
                    }
                  }
                }
              }
            },

          }
        }, currentLanguage);

        if (response && response.data) {
          setHomePageData(response.data);
        }
      } catch (err) {
        console.error('Error fetching home page content:', err);
        setError('Không thể tải nội dung trang chủ');
      } finally {
        setLoading(false);
      }
    };

    fetchHomePageContent();
  }, [currentLanguage]);

  // Hiển thị trạng thái loading hoặc error nếu cần
  if (loading) {
    // Vẫn render các section mặc định trong khi đang tải dữ liệu
    console.log('Đang tải dữ liệu trang chủ...');
  }

  if (error) {
    console.error('Lỗi:', error);
    // Vẫn render các section mặc định nếu có lỗi
  }

  return (
    <>
      <SimpleSEOHead
        description={getSiteDescription()}
        type="website"
      />
      <div className="page-wrapper">
        <HeroSection homePageData={homePageData} />
        <ClientsSection partner={homePageData?.partner} />
        <FeaturesSection service={homePageData?.service} />
        <AboutSection about={homePageData?.aboutus} />
        <AchievementSection achievements={homePageData?.company_achievement} />
        <BlogSection news={homePageData?.news} />

        {/* Add more sections as needed */}
      </div>
    </>
  );
};

export default HomePage;
