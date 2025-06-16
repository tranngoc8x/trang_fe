import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
