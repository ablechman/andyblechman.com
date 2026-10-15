import React from 'react';
import { Link } from 'react-router-dom';
import { useTitle } from '../Layout';

const NotFound = () => {
  useTitle('Not found');
  return (
    <main>
      <h1 className="text-3xl font-normal mb-4">Page not found</h1>
      <p className="text-lg leading-relaxed mb-6">That page doesn't exist, or it moved.</p>
      <Link to="/blog" className="underline decoration-gray-500 hover:decoration-gray-900 font-medium">
        See all posts →
      </Link>
    </main>
  );
};

export default NotFound;
