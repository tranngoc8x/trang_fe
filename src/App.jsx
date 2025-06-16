import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { GlobalConfigProvider, useGlobalConfig } from './contexts/GlobalConfigContext';
import LoadingScreen, { ErrorScreen, MaintenanceScreen } from './components/LoadingScreen';
import SEOHead, { StructuredData, useOrganizationStructuredData } from './components/SEOHead';

/**
 * App Content Component
 * Renders the main app content after global config is loaded
 */
const AppContent = () => {
  const {
    loading,
    error,
    isMaintenanceMode,
    isReady,
    refresh
  } = useGlobalConfig();

  // Get organization structured data
  const organizationData = useOrganizationStructuredData();

  // Show loading screen while loading global config
  if (loading && !isReady()) {
    return <LoadingScreen message="Loading..." />;
  }

  // Show error screen if failed to load and no cached data
  if (error && !isReady()) {
    return (
      <ErrorScreen
        error={error}
        onRetry={refresh}
        message="Failed to load configuration"
      />
    );
  }

  // Show maintenance screen if maintenance mode is enabled
  if (isMaintenanceMode()) {
    return <MaintenanceScreen />;
  }

  return (
    <>
      {/* SEO Head - manages document head */}
      <SEOHead />

      {/* Organization Structured Data */}
      {organizationData && <StructuredData data={organizationData} />}

      {/* Main App Layout */}
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

/**
 * Main App Component
 * Wraps the app with all necessary providers
 */
function App() {
  return (
    <GlobalConfigProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </GlobalConfigProvider>
  );
}

export default App;
