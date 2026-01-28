import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/ui/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-rout-paper text-rout-soot font-sans selection:bg-rout-matcha selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;