import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug } from './posts';

const BlogPost = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
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
          <h1 className="text-2xl font-normal mb-4">Post not found</h1>
          <Link to="/blog" className="underline decoration-gray-500 hover:decoration-gray-900">← Back to all posts</Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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

      <article className="max-w-[550px] mx-auto pt-10 pb-10 px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-normal mb-2">{post.title}</h1>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </header>

        <div className="prose-custom">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="text-lg leading-relaxed mb-4">{children}</p>,
              h2: ({ children }) => <h2 className="text-xl font-normal mt-8 mb-4">{children}</h2>,
              h3: ({ children }) => <h3 className="text-lg font-medium mt-6 mb-3">{children}</h3>,
              a: ({ href, children }) => (
                <a href={href} className="underline decoration-gray-500 hover:decoration-gray-900 font-medium" target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
              ul: ({ children }) => <ul className="list-disc pl-5 space-y-2 mb-4">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-5 space-y-2 mb-4">{children}</ol>,
              li: ({ children }) => <li className="text-lg leading-relaxed">{children}</li>,
              blockquote: ({ children }) => <blockquote className="border-l-2 border-gray-300 pl-4 italic text-gray-700 my-4">{children}</blockquote>,
              code: ({ children }) => <code className="bg-gray-100 px-1 py-0.5 rounded text-base">{children}</code>,
              pre: ({ children }) => <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
              img: ({ src, alt }) => <img src={src} alt={alt} className="w-full rounded-lg my-4" />,
              hr: () => <hr className="border-gray-200 my-8" />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <Link to="/blog" className="text-sm font-medium text-gray-900 underline decoration-gray-500 hover:decoration-gray-900">
            ← Back to all posts
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
