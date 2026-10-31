import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout({ children }) {
  const { pathname } = useLocation();

  // Scroll lên đầu trang khi thay đổi trang
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="app-layout">
      {/* Ambient background light orbs */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-orb-1" />
        <div className="ambient-orb-2" />
      </div>

      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}
