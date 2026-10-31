import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';
import ToolPage from './pages/ToolPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Sitemap from './pages/Sitemap';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cong-cu/:slug" element={<ToolPage />} />
        <Route path="/gioi-thieu" element={<About />} />
        <Route path="/lien-he" element={<Contact />} />
        <Route path="/chinh-sach-bao-mat" element={<Privacy />} />
        <Route path="/dieu-khoan-su-dung" element={<Terms />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
