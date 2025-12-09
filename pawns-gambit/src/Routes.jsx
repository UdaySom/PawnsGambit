import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "app/components/ScrollToTop";
import ErrorBoundary from "app/components/ErrorBoundary";
import NotFound from "app/pages/NotFound";
import Community from './app/pages/community';
import PodcastPage from './app/pages/podcasts';
import Events from './app/pages/events';
import About from './app/pages/about';
import Homepage from './app/pages/homepage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/podcast" element={<PodcastPage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<About />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
