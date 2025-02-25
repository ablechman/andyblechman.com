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
    <div className="min-h-screen bg-[#f8f5f1] font-serif text-gray-900">
      <div className="max-w-[550px] mx-auto pt-20 pb-20 px-4">
        <header className="mb-20">
          <h1 className="text-4xl font-normal mb-8">Andy Blechman</h1>
          <p className="text-xl leading-relaxed">
            Cofounder of Bottle.com, a business-in-a-box for local food entrepreneurs. Currently I'm interested in the ways physiology and psychology affect human performance. 
          </p>
        </header>

        <main className="space-y-20">
          <section>
            <h2 className="text-2xl font-normal mb-6">Featured Writing</h2>
            <div className="space-y-6">
              {blogPosts.map((post, index) => (
                <div key={index} className="group">
                  <div className="text-sm text-gray-500 mb-1">{post.date}</div>
                  <a 
                    href={post.url} 
                    className="text-xl underline decoration-gray-300 hover:decoration-gray-600 transition-colors"
                  >
                    {post.title}
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-normal mb-6">Work</h2>
            <ul className="list-disc pl-5 space-y-6">
              <li className="text-xl leading-relaxed">
                Co-founded Bottle.com with Will. All-in-one software for food entrepreneurs 
                to sell online. Partnered with local business owners to help them create 
                better businesses. (~10M healthy meals sold)
              </li>
              <li className="text-xl leading-relaxed">
                Launched Southfork in Atlanta, a virtual cafeteria concept for companies. 
                Learned about food delivery before pivoting to Bottle.
              </li>
              <li className="text-xl leading-relaxed">
                Two tours at SiteCompli with Jason and Ross. First helping grow from 5 to ~20 
                employees, then during scaling post-capital injection.
              </li>
              <li className="text-xl leading-relaxed">
                Pre-revenue and pre-funding at Accordion. Learned what it takes to start a business. 
                Wore a lot of hats but technically was the COO where I focused on staffing, recruiting, 
                and business operations.
              </li>
              <li className="text-xl leading-relaxed">
                Started off in finance because it was what my friends in college were doing. 
                Wish I'd been more thoughtful here, but it worked out.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-normal mb-6">About</h2>
            <div className="space-y-6">
              <img 
                src="/images/Family photo.png"
                alt="Andy with family by wooden wall" 
                className="w-full rounded-lg object-cover"
              />
              <p className="text-xl leading-relaxed">
                Live outside Atlanta with my wife, Meredith, and our three amazing kids.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-normal mb-6">Connect</h2>
            <ul className="list-disc pl-5 space-y-4">
              <li className="text-xl leading-relaxed">
                <a 
                  href="https://linkedin.com/in/andyblechman" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="underline decoration-gray-300 hover:decoration-gray-600 transition-colors"
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

export default App