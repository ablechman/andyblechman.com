import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import api from "./ghost";

// Individual Blog Post Component
const BlogPost = ({ posts }) => {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  if (!post) return <div>Post not found</div>;

  return (
    <div className="max-w-[550px] mx-auto pt-24 pb-20 px-4">
      <h1 className="text-3xl mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-6">{post.date}</p>
      {/* You might want to add more post details here */}
      <Link 
        to="/" 
        className="text-blue-600 hover:underline"
      >
        Back to Home
      </Link>
    </div>
  );
};

// Main App Component
const App = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts from Ghost
    api.posts
      .browse({
        limit: 3,
        include: ['tags']
      })
      .then(posts => {
        const formattedPosts = posts.map(post => ({
          ...post, // Spread the entire post object
          date: new Date(post.published_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short', 
            day: 'numeric'
          }).toUpperCase(),
        }));
        
        setBlogPosts(formattedPosts);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        // Keep the hardcoded posts as fallback
        setBlogPosts([
          {
            slug: 'ai-consciousness',
            date: "2024 MAR 15",
            title: "AI vs. Aid to Consciousness vs. Super-intelligence vs. AI",
            url: "#"
          },
          {
            slug: 'sf-hypothesis',
            date: "2024 NOV 14", 
            title: "My experience Hypothesis in SF",
            url: "#"
          },
          {
            slug: 'decentralization',
            date: "2024 FEB 3",
            title: "Decentralization is a narrative mirage",
            url: "#"
          }
        ]);
      });
  }, []);

  // Main Page Content
  const MainContent = () => (
    <div className="min-h-screen bg-[#f8f5f1] font-serif text-gray-900">
      <div className="max-w-[550px] mx-auto pt-24 pb-20 px-4">
        <header className="mb-20">
          <h1 className="text-4xl font-normal mb-10">Andy Blechman</h1>
          <p className="text-xl leading-relaxed">
            Cofounder of <a href="https://bottle.com" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-500 hover:decoration-gray-900 font-medium">Bottle.com</a>, a business-in-a-box for local food entrepreneurs. Currently I'm interested in the ways physiology and psychology affect human performance. 
          </p>
        </header>

        <main>
          <section className="mb-20">
            <h2 className="text-2xl font-normal mb-8">Featured Writing</h2>
            {loading ? (
              <p>Loading posts...</p>
            ) : (
              <div className="space-y-6">
                {blogPosts.map((post, index) => (
                  <div key={index} className="group">
                    <div className="text-sm text-gray-500 mb-1">{post.date}</div>
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="text-xl underline decoration-gray-500 hover:decoration-gray-900 font-medium"
                    >
                      {post.title}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Rest of your existing content remains the same */}
          <section className="mb-20">
            <h2 className="text-2xl font-normal mb-8">Work</h2>
            <ul className="list-disc pl-5 space-y-6">
              <li className="text-xl leading-relaxed">
                Co-founded Bottle.com with <a href="https://www.secondbreakfast.co/" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-500 hover:decoration-gray-900 font-medium">Will</a>. All-in-one software for food entrepreneurs 
                to sell online. Partnered with local business owners to help them create 
                better businesses. (~10M healthy meals sold)
              </li>
              {/* ... other work items ... */}
            </ul>
          </section>

          {/* ... rest of your sections ... */}
        </main>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route 
          path="/blog/:slug" 
          element={<BlogPost posts={blogPosts} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;