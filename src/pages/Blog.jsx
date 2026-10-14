import React from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../posts';
import { formatDate } from '../lib/frontmatter';
import { useTitle } from '../Layout';
import { SubscribeBox } from '../components/Subscribe';

const Blog = () => {
  useTitle('Posts');

  return (
    <main>
      <h1 className="text-3xl font-normal mb-3">Posts</h1>
      <p className="text-lg leading-relaxed text-gray-600 mb-10">
        Notes on ideas I'm chewing on: health, sleep, food, and building companies.
      </p>

      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug}>
            <div className="text-sm text-gray-500 mb-1">{formatDate(post.date)}</div>
            <h2 className="text-xl font-normal mb-2">
              <Link
                to={`/blog/${post.slug}`}
                className="underline decoration-gray-500 hover:decoration-gray-900 font-medium"
              >
                {post.title}
              </Link>
            </h2>
            {post.excerpt && <p className="text-base leading-relaxed text-gray-700">{post.excerpt}</p>}
          </article>
        ))}
      </div>

      <div className="mt-14">
        <SubscribeBox />
      </div>

    </main>
  );
};

export default Blog;
