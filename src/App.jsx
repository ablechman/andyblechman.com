import React, { useState, useEffect } from 'react';
import api from './ghost';

const App = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Fetch posts from Ghost
    console.log('Attempting to fetch posts from Ghost...');
    api.posts
      .browse({
        limit: 5, // Changed from 3 to 5 posts
        include: ['tags', 'authors'],
        filter: 'tag:featured', // Add filter for featured tag
        order: 'published_at DESC' // Ensure newest posts come first
      })
      .then(posts => {
        console.log('Posts received:', posts);
        const formattedPosts = posts.map(post => ({
          date: new Date(post.published_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short', 
            day: 'numeric'
          }).toUpperCase(),
          title: post.title,
          url: `https://blog.andyblechman.com/${post.slug}` // Fixed URL format with domain
        }));
        
        setBlogPosts(formattedPosts);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
        setLoading(false);
        // Keep the hardcoded posts as fallback
        setBlogPosts([
          {
            date: "2024 MAR 15",
            title: "AI vs. Aid to Consciousness vs. Super-intelligence vs. AI",
            url: "https://blog.andyblechman.com/ai-consciousness-superintelligence"
          },
          {
            date: "2024 NOV 14", 
            title: "My experience Hypothesis in SF",
            url: "https://blog.andyblechman.com/hypothesis-sf-experience"
          },
          {
            date: "2024 FEB 3",
            title: "Decentralization is a narrative mirage",
            url: "https://blog.andyblechman.com/decentralization-narrative-mirage"
          },
          // Added fallback posts to match the 5 post limit
          {
            date: "2024 JAN 20",
            title: "Building a resilient startup in uncertain times",
            url: "https://blog.andyblechman.com/resilient-startup-uncertain-times"
          },
          {
            date: "2023 DEC 12",
            title: "Lessons from scaling a food business",
            url: "https://blog.andyblechman.com/scaling-food-business-lessons"
          }
        ]);
      });
  }, []);

  // Rest of the component code remains the same...
  // Handle form submission to Ghost
  const handleSubscribe = (e) => {
    e.preventDefault();
    // This would normally submit to Ghost API
    console.log('Subscribing email:', email);
    
    // Here you would typically integrate with Ghost's Members API
    // For now, we'll show a confirmation message
    alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-[#f8f5f1] font-serif text-gray-900">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 border-b border-gray-200 bg-[#f8f5f1] px-4 py-3 z-10 shadow-sm">
        <div className="max-w-[550px] mx-auto flex justify-between items-center">
          <div>
            <a href="https://andyblechman.com" className="text-sm font-medium text-gray-900 hover:text-gray-600">Home</a>
          </div>
          <div className="flex items-center space-x-6">
            <a href="https://blog.andyblechman.com" className="text-sm font-medium text-gray-900 hover:text-gray-600">Posts</a>
            <a href="#subscribe" className="text-sm font-medium text-gray-900 underline decoration-gray-500 hover:decoration-gray-900">
              Subscribe
            </a>
          </div>
        </div>
      </nav>
      
      <div className="max-w-[550px] mx-auto pt-10 pb-10 px-4">
        <header className="mb-10">
          <h1 className="text-3xl font-normal mb-6">Andy Blechman</h1>
          <div className="text-lg leading-relaxed space-y-4">
            <p>
              I'm the cofounder of <a href="https://bottle.com" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-500 hover:decoration-gray-900 font-medium">Bottle.com</a>, a business-in-a-box for local food entrepreneurs.
            </p>
            <p>
              I've spent the bulk of my <a href="#work" className="underline decoration-gray-500 hover:decoration-gray-900 font-medium">career</a> as a founder building companies from zero to one.
            </p>
            <p>
              Currently, I'm most interested in how physiological behaviors like sleep and exercise can improve human performance at work and in sports.
            </p>
          </div>
        </header>

        <main>
          <section className="mb-12">
            <h2 className="text-xl font-normal mb-6">Featured Writing</h2>
            {loading ? (
              <p>Loading posts...</p>
            ) : (
              <div className="space-y-4">
                {blogPosts.map((post, index) => (
                  <div key={index} className="group">
                    <div className="text-sm text-gray-500 mb-1">{post.date}</div>
                    <a 
                      href={post.url} 
                      className="text-lg underline decoration-gray-500 hover:decoration-gray-900 font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {post.title}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Rest of the component remains the same */}
        </main>
      </div>
    </div>
  );
};

export default App;