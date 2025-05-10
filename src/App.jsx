import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ClientsSection from './components/ClientsSection';
import FeaturesSection from './components/FeaturesSection';
import AchievementSection from './components/AchievementSection';
import CommunitySection from './components/CommunitySection';
import TestimonialsSection from './components/TestimonialsSection';
import BlogSection from './components/BlogSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ClientsSection />
        <FeaturesSection />
        <AchievementSection />
        <CommunitySection />
        <TestimonialsSection />
        <BlogSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
