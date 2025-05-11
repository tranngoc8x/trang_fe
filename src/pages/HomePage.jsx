import { useState, useEffect } from 'react';
import { homePageService } from '@services/appService';
import HeroSection from '@/components/HeroSection';
import ClientsSection from '@/components/ClientsSection';
import FeaturesSection from '@/components/FeaturesSection';
import AboutSection from '@/components/AboutSection';
import AchievementSection from '@/components/AchievementSection';
import CommunitySection from '@/components/CommunitySection';
import BlogSection from '@/components/BlogSection';


const HomePage = () => {
  const [homePageData, setHomePageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        });

        if (response && response.data) {
          setHomePageData(response.data);
          console.log('Home page content:', response.data);
        }
      } catch (err) {
        console.error('Error fetching home page content:', err);
        setError('Không thể tải nội dung trang chủ');
      } finally {
        setLoading(false);
      }
    };

    fetchHomePageContent();
  }, []);

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
      <HeroSection homePageData={homePageData} />
      <ClientsSection partner={homePageData?.partner} />
      <FeaturesSection service={homePageData?.service} />
      <AboutSection about={homePageData?.aboutus} />
      <AchievementSection achievements={homePageData?.company_achievement} />
      <BlogSection news={homePageData?.news} />

      {/* Add more sections as needed */}
    </>
  );
};

export default HomePage;
