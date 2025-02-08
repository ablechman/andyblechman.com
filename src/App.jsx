import React from 'react'

const App = () => {
  const blogPosts = [
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
  ]

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <div className="max-w-[640px] mx-auto pt-16">
        <header className="mb-16">
          <h1 className="text-3xl font-normal mb-6">Andy Blechman</h1>
          <p className="text-gray-700 leading-relaxed">
            I'm primarily interested in helping local businesses thrive through better technology. 
            Previously co-founded Bottle.com, helping food entrepreneurs sell online and grow their businesses.
          </p>
        </header>

        <main>
          <section className="mb-16">
            <h2 className="text-lg font-normal mb-4">Featured Writing</h2>
            <div className="space-y-3">
              {blogPosts.map((post, index) => (
                <div key={index} className="group">
                  <div className="text-sm text-gray-500 mb-0.5">{post.date}</div>
                  <a 
                    href={post.url} 
                    className="text-gray-900 hover:text-gray-600 transition-colors"
                  >
                    {post.title}
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-lg font-normal mb-4">Work</h2>
            <ul className="list-disc pl-4 space-y-3 text-gray-700">
              <li>
                Co-founded Bottle.com with Will. All-in-one software for food entrepreneurs 
                to sell online. Partnered with local business owners to help them create 
                better businesses. (~10M healthy meals sold)
              </li>
              <li>
                Launched Southfork in Atlanta, a virtual cafeteria concept for companies. 
                Learned about food delivery before pivoting to Bottle.
              </li>
              <li>
                Two tours at SiteCompli with Jason and Ross. First helping grow from 5 to ~20 
                employees, then during scaling post-capital injection.
              </li>
              <li>
                Pre-revenue and pre-funding at Accordion. Learned what it takes to start a business. 
                Wore a lot of hats but technically was the COO where I focused on staffing, recruiting, 
                and business operations.
              </li>
              <li>
                Started off in finance because it was what my friends in college were doing. 
                Wish I'd been more thoughtful here, but it worked out.
              </li>
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-lg font-normal mb-4">About</h2>
            <div className="space-y-4">
              <img 
                src="/images/family-photo.png"
                alt="Andy with family by wooden wall" 
                className="w-full rounded-lg object-cover"
              />
              <p className="text-gray-700">
                Live outside Atlanta.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-lg font-normal mb-4">Connect</h2>
            <ul className="list-disc pl-4 space-y-1.5 text-gray-700">
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Email
                </a>
              </li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App