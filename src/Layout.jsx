import React, { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { SubscribeButton } from './components/Subscribe';

const navLink = ({ isActive }) =>
  `text-sm font-medium hover:text-gray-600 ${isActive ? 'text-gray-900 underline decoration-gray-500' : 'text-gray-900'}`;

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · Andy Blechman` : 'Andy Blechman';
  }, [title]);
}

const Layout = () => (
  <div className="min-h-screen bg-[#f8f5f1] font-serif text-gray-900">
    <ScrollToTop />
    <nav className="sticky top-0 border-b border-gray-200 bg-[#f8f5f1] px-4 py-3 z-10 shadow-sm">
      <div className="max-w-[550px] mx-auto flex justify-between items-center">
        <Link to="/" className="text-sm font-medium text-gray-900 hover:text-gray-600">
          Andy Blechman
        </Link>
        <div className="flex items-center space-x-4 sm:space-x-6">
          <NavLink to="/" end className={navLink}>
            Home
          </NavLink>
          <NavLink to="/blog" className={navLink}>
            Posts
          </NavLink>
          <SubscribeButton />
        </div>
      </div>
    </nav>

    <div className="max-w-[550px] mx-auto pt-10 pb-10 px-4">
      <Outlet />
    </div>
  </div>
);

export default Layout;
