import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPost } from '../posts';
import { formatDate } from '../lib/frontmatter';
import { useTitle } from '../Layout';
import NotFound from './NotFound';

const Post = () => {
  const { slug } = useParams();
  const post = getPost(slug);
  useTitle(post ? post.title : 'Not found');

  if (!post) return <NotFound />;

  return (
    <main>
      <article>
        <header className="mb-8">
          <div className="text-sm text-gray-500 mb-2">{formatDate(post.date)}</div>
          <h1 className="text-3xl font-normal leading-tight">{post.title}</h1>
        </header>
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>

      <footer className="mt-16 pt-8 border-t border-gray-200 flex justify-between text-sm">
        <Link to="/blog" className="font-medium underline decoration-gray-500 hover:decoration-gray-900">
          ← All posts
        </Link>
        <Link to="/" className="font-medium underline decoration-gray-500 hover:decoration-gray-900">
          Home
        </Link>
      </footer>
    </main>
  );
};

export default Post;
