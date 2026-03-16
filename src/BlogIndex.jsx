import React from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from './posts';

const BlogIndex = () => {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-[#f8f5f1] font-serif text-gray-900">
      <nav className="sticky top-0 border-b border-gray-200 bg-[#f8f5f1] px-4 py-3 z-10 shadow-sm">
        <div className="max-w-[550px] mx-auto flex justify-between items-center">
          <div>
            <Link to="/" className="text-sm font-medium text-gray-900 hover:text-gray-600">Home</Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/blog" className="text-sm font-medium text-gray-900 hover:text-gray-600">Posts</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-[550px] mx-auto pt-10 pb-10 px-4">
        <h1 className="text-3xl font-normal mb-8">All Posts</h1>

        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.slug} className="group">
              <div className="text-sm text-gray-500 mb-1">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                }).toUpperCase()}
              </div>
              <Link
                to={`/blog/${post.slug}`}
                className="text-lg underline decoration-gray-500 hover:decoration-gray-900 font-medium"
              >
                {post.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogIndex;
