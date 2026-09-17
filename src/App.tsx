import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import WhatWeDo from './components/WhatWeDo';
import WhoWeAre from './components/WhoWeAre';
import StatsRow from './components/StatsRow';
import FeaturedLaptops from './components/FeaturedLaptops';
import Services from './components/Services';
import Softwares from './components/Softwares';
import Testimonial from './components/Testimonial';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import FieldPulsePage from './app/products/fieldpulse/page';
import CyberlinkHRPage from './app/products/cyberlinkhr/page';
import HotelWifiPage from './app/products/hotelwifi/page';
import AgentProPage from './app/products/agentpro/page';
import { InView } from './components/InView';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Sync state with popstate event (back/forward browser buttons)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Intercept normal anchor tag clicks for client-side routing
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor) {
        const href = anchor.getAttribute('href');

        if (!href) return;

        // Absolute local routes (e.g. /products/fieldpulse)
        if (href.startsWith('/') && !href.startsWith('//')) {
          e.preventDefault();
          window.history.pushState({}, '', href);
          setCurrentPath(href);
          window.scrollTo(0, 0);
          return;
        }

        // Hash-only links (e.g. #networking, #contact)
        if (href.startsWith('#') && href.length > 1) {
          e.preventDefault();
          const id = href.slice(1);

          if (currentPath !== '/') {
            // Navigate home first, then scroll after the home page renders
            window.history.pushState({}, '', '/');
            setCurrentPath('/');
            window.scrollTo(0, 0);
            setTimeout(() => {
              const el = document.getElementById(id);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 120);
          } else {
            // Already on home — just scroll
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
          return;
        }

        // Placeholder '#' — prevent default
        if (href === '#') {
          e.preventDefault();
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, [currentPath]);

  const isFieldPulse = currentPath === '/products/fieldpulse';
  const isCyberlinkHR = currentPath === '/products/cyberlinkhr';
  const isHotelWifi = currentPath === '/products/hotelwifi';
  const isAgentPro = currentPath === '/products/agentpro';

  return (
    <>
      <Nav />
      {isFieldPulse ? (
        <main>
          <FieldPulsePage />
        </main>
      ) : isCyberlinkHR ? (
        <main>
          <CyberlinkHRPage />
        </main>
      ) : isHotelWifi ? (
        <main>
          <HotelWifiPage />
        </main>
      ) : isAgentPro ? (
        <main>
          <AgentProPage />
        </main>
      ) : (
        <main>
          {/* Hero — no InView, it's the first thing visible */}
          <Hero />

          {/* Marquee — subtle fade-in from below */}
          <InView transition={{ duration: 0.5, ease: 'easeOut' }}>
            <Marquee />
          </InView>

          {/* Who We Are — slide + blur from bottom */}
          <InView
            variants={{
              hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <WhoWeAre />
          </InView>

          {/* What We Do — slide + blur from bottom */}
          <InView
            variants={{
              hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.55, ease: 'easeOut', staggerChildren: 0.08 },
              },
            }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <WhatWeDo />
          </InView>

          {/* Stats Row — scale up from slightly smaller */}
          <InView
            variants={{
              hidden: { opacity: 0, scale: 0.96 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <StatsRow />
          </InView>

          {/* Featured Laptops — slide from right */}
          <InView
            variants={{
              hidden: { opacity: 0, x: 40, filter: 'blur(4px)' },
              visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <FeaturedLaptops />
          </InView>

          {/* Services — fade + scale */}
          <InView
            variants={{
              hidden: { opacity: 0, scale: 0.97, filter: 'blur(4px)' },
              visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Services />
          </InView>

          {/* Softwares — slide + blur from bottom */}
          <InView
            variants={{
              hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
            }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <Softwares />
          </InView>

          {/* Testimonial — fade + slight upward slide */}
          <InView
            variants={{
              hidden: { opacity: 0, y: 30, filter: 'blur(3px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Testimonial />
          </InView>

          {/* Contact Form — no additional InView, it already has its own animations internally */}
          <ContactForm />
        </main>
      )}
      <Footer />
    </>
  );
}

