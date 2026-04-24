import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Community from './pages/Community';
import NotFound from './pages/NotFound';
import './index.css';

// Scroll to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <PageLoader />
      <ScrollToTop />
      <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/about"     element={<About />} />
            <Route path="/programs"  element={<Programs />} />
            <Route path="/projects"  element={<Projects />} />
            <Route path="/blog"      element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/community" element={<Community />} />
            <Route path="*"          element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
