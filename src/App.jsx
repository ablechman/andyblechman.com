import React, { useState, useEffect } from 'react';
import api from './ghost';

const App = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSubscribe, setShowSubscribe] = useState(false);

  useEffect(() => {
    // Fetch posts from Ghost
    console.log('Attempting to fetch posts from Ghost...');
    api.posts
      .browse({
        limit: 3,
        include: ['tags']
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
          url: `/blog/${post.slug}`
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
            url: "#"
          },
          {
            date: "2024 NOV 14", 
            title: "My experience Hypothesis in SF",
            url: "#"
          },
          {
            date: "2024 FEB 3",
            title: "Decentralization is a narrative mirage",
            url: "#"
          }
        ]);
      });
  }, []);

  // Load Ghost signup form script when subscribe overlay is shown
  useEffect(() => {
    if (showSubscribe) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/ghost/signup-form@~0.2/umd/signup-form.min.js';
      script.async = true;
      script.dataset.backgroundColor = '#FFFFFF';
      script.dataset.textColor = '#000000';
      script.dataset.buttonColor = '#000000';
      script.dataset.buttonTextColor = '#FFFFFF';
      script.dataset.title = 'Andy Blechman';
      script.dataset.description = '';
      script.dataset.site = 'https://andys-blog.ghost.io/';
      script.dataset.locale = 'en';
      
      document.getElementById('subscribe-container').appendChild(script);
      
      return () => {
        if (document.getElementById('subscribe-container').contains(script)) {
          document.getElementById('subscribe-container').removeChild(script);
        }
      };
    }
  }, [showSubscribe]);

  return (
    <div className="min-h-screen bg-[#f8f5f1] font-serif text-gray-900">
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-[#f8f5f1] px-4 py-3">
        <div className="max-w-[550px] mx-auto flex justify-between items-center">
          <div>
            <a href="https://andyblechman.com" className="text-sm font-medium text-gray-900 hover:text-gray-600">Home</a>
          </div>
          <div className="flex items-center space-x-6">
            <a href="https://blog.andyblechman.com" className="text-sm font-medium text-gray-900 hover:text-gray-600">Posts</a>
            <button 
              onClick={() => setShowSubscribe(true)} 
              className="text-sm font-medium text-gray-900 underline decoration-gray-500 hover:decoration-gray-900"
            >
              Subscribe
            </button>
          </div>
        </div>
      </nav>
      
      {/* Subscribe Overlay */}
      {showSubscribe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative p-6">
            <button 
              onClick={() => setShowSubscribe(false)}
              className="absolute top-3 right-3 text-gray-800 hover:text-gray-600"
              aria-label="Close subscription form"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-normal text-center mb-4">Subscribe to Newsletter</h2>
            <p className="text-sm text-gray-600 text-center mb-6">Stay updated with my latest writing and thoughts</p>
            <div id="subscribe-container" style={{ height: '40vmin', minHeight: '200px' }}></div>
          </div>
        </div>
      )}
      
      <div className="max-w-[550px] mx-auto pt-10 pb-16 px-4">
        <header className="mb-10">
          <h1 className="text-3xl font-normal mb-6">Andy Blechman</h1>
          <p className="text-lg leading-relaxed">
            Cofounder of <a href="https://bottle.com" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-500 hover:decoration-gray-900 font-medium">Bottle.com</a>, a business-in-a-box for local food entrepreneurs. Currently I'm interested in the ways physiology and psychology affect human performance. 
          </p>
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
                    >
                      {post.title}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-normal mb-6">Work</h2>
            <ul className="list-disc pl-5 space-y-4">
              <li className="text-lg leading-relaxed">
                Co-founded Bottle.com with <a href="https://www.secondbreakfast.co/" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-500 hover:decoration-gray-900 font-medium">Will</a>. All-in-one software for food entrepreneurs 
                to sell online. Partnered with local business owners to help them create 
                better businesses. (~10M healthy meals sold)
              </li>
              <li className="text-lg leading-relaxed">
                Launched Southfork in Atlanta, a virtual cafeteria concept for companies. 
                Learned about food delivery before pivoting to Bottle.
              </li>
              <li className="text-lg leading-relaxed">
                Two tours at SiteCompli with <a href="https://www.linkedin.com/in/jgnyc/" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-500 hover:decoration-gray-900 font-medium">Jason</a> and <a href="https://www.linkedin.com/in/rossgoldenberg/" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-500 hover:decoration-gray-900 font-medium">Ross</a>. First helping grow from 5 to ~20 
                employees, then during scaling post-capital injection.
              </li>
              <li className="text-lg leading-relaxed">
                Pre-revenue and pre-funding at <a href="https://accordion.com" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-500 hover:decoration-gray-900 font-medium">Accordion</a>. Learned what it takes to start a business. 
                Wore a lot of hats but technically was the COO where I focused on staffing, recruiting, 
                and business operations.
              </li>
              <li className="text-lg leading-relaxed">
                Started off in finance because it was what my friends in college were doing. 
                Wish I'd been more thoughtful here, but it worked out.
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
                Live outside Atlanta with my wife, <a href="https://www.linkedin.com/in/meredith-blechman/" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-500 hover:decoration-gray-900 font-medium">Meredith</a>, and our three amazing kids.
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
            </ul>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App;