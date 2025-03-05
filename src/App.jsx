import React, { useState, useEffect } from 'react';
import api from './ghost';

const App = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts from Ghost
    console.log('Attempting to fetch posts from Ghost...');
    api.posts
      .browse({
        limit: 5,
        include: ['tags', 'authors'],
        order: 'published_at DESC'
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
          url: `https://blog.andyblechman.com/${post.slug}`
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
      
    // Load Ghost's portal script
    const script = document.createElement('script');
    script.src = 'https://blog.andyblechman.com/ghost/portal.js';
    script.async = true;
    script.defer = true;
    script.id = 'ghost-portal-script';
    document.body.appendChild(script);
    
    return () => {
      // Cleanup
      const portalScript = document.getElementById('ghost-portal-script');
      if (portalScript) {
        portalScript.remove();
      }
    };
  }, []);
  
  // Function to trigger Ghost's subscription modal
  const openSubscribeModal = (e) => {
    e.preventDefault();
    if (window.ghost) {
      window.ghost.openSubscribe();
    } else {
      window.open('https://blog.andyblechman.com/#/portal/signup', '_blank');
    }
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
                
                <div className="mt-6">
                  <a 
                    href="https://blog.andyblechman.com" 
                    className="text-sm font-medium text-gray-900 underline decoration-gray-500 hover:decoration-gray-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read more posts →
                  </a>
                </div>
              </div>
            )}
          </section>

          <section id="work" className="mb-12">
            <h2 className="text-xl font-normal mb-6">Work</h2>
            <ul className="list-disc pl-5 space-y-4">
              <li className="text-lg leading-relaxed">
                2015 - 2025: Cofounder of <a href="https://bottle.com" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-500 hover:decoration-gray-900 font-medium">Bottle.com</a> with <a href="https://www.secondbreakfast.co/" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-500 hover:decoration-gray-900 font-medium">Will</a>. Bottle is an  all-in-one software for food entrepreneurs to sell online. We partner with local business owners to help them build stronger  businesses and win online. Incredibly proud of what we've built and our impact. 
              </li>
              <li className="text-lg leading-relaxed">
                2014 - 2015: I launched Southfork in Atlanta, a virtual cafeteria concept for large companies. I was fortunate to partner with many of Atlanta's top businesses including King and Spalding, Cox, and MailChimp.  Developed a deep understanding of food delivery and the challenges of building a local delivery business before pivoting to Bottle.
              </li>
              <li className="text-lg leading-relaxed">
                2012 - 2014: I had two tours at SiteCompli with <a href="https://www.linkedin.com/in/jgnyc/" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-500 hover:decoration-gray-900 font-medium">Jason</a> and <a href="https://www.linkedin.com/in/rossgoldenberg/" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-500 hover:decoration-gray-900 font-medium">Ross</a>. I was initially brought on to develop a system to grow headcount from 5 to 20. During business school, I returned for a second stint to implement a recruiting and training process as the company scaled from 20 to 40 employees following a significant capital injection.
              </li>
              <li className="text-lg leading-relaxed">
                2009 - 2012: I was a cofounder at <a href="https://accordion.com" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-500 hover:decoration-gray-900 font-medium">Accordion</a>, joining the company pre-revenue and pre-funding. I learned what it takes to start a business and get to product-market fit. I wore a lot of hats as the COO where I focused on staffing, recruiting, and business operations. Accordion exited to Charlesbank in 2022.
              </li>
              <li className="text-lg leading-relaxed">
                2006 - 2009: I started off in finance because it was what my friends in college were doing. I wish I'd been more thoughtful here, but it worked out.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-normal mb-6">About</h2>
            <div className="space-y-4">
              <img 
                src="/images/Family photo.png"
                alt="Andy with family by wooden wall" 
                className="w-full rounded-lg object-cover"
              />
              <p className="text-lg leading-relaxed">
                I live outside Atlanta with my wife, <a href="https://www.linkedin.com/in/meredith-blechman/" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-500 hover:decoration-gray-900 font-medium">Meredith</a>, and our three amazing kids. In 2022, we moved to a small community 30 minutes south of ATL. It's a great place to raise a family, filled with wonderful people and an incredible trail running system. 
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-normal mb-6">Connect</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li className="text-lg leading-relaxed">
                <a 
                  href="https://linkedin.com/in/andyblechman" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="underline decoration-gray-500 hover:decoration-gray-900 font-medium"
                >
                  LinkedIn
                </a>
              </li>
              <li className="text-lg leading-relaxed">
                <a 
                  href="mailto:andrew.n.blechman@gmail.com" 
                  className="underline decoration-gray-500 hover:decoration-gray-900 font-medium"
                >
                  andrew.n.blechman@gmail.com
                </a>
              </li>
            </ul>
          </section>

          {/* Subscribe Section - Using Ghost's native portal */}
          <section id="subscribe" className="mt-20 mb-10 pt-10 border-t border-gray-200">
            <h2 className="text-xl font-normal mb-6 text-center">Subscribe for email alerts about new posts:</h2>
            
            <div className="max-w-md mx-auto">
              <button
                onClick={openSubscribeModal}
                className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors"
              >
                Subscribe for future updates
              </button>
              
              <div className="mt-4 text-center">
                <a href="/privacy" className="text-sm text-gray-700 underline hover:text-gray-900">
                  Privacy policy
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;