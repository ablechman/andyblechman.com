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
    <div className="min-h-screen bg-[#faf9f7] font-serif">
      <div className="max-w-[600px] mx-auto pt-24 px-4">
        <header className="mb-24">
          <h1 className="text-4xl font-normal mb-10 text-gray-900">Andy Blechman</h1>
          <p className="text-lg text-gray-800 leading-relaxed">
            I'm primarily interested in helping local businesses thrive through better technology. 
            Previously co-founded Bottle.com, helping food entrepreneurs sell online and grow their businesses.
          </p>
        </header>

        <main>
          <section className="mb-24">
            <h2 className="text-2xl font-normal mb-8 text-gray-900">Featured Writing</h2>
            <div className="space-y-6">
              {blogPosts.map((post, index) => (
                <div key={index} className="group">
                  <div className="text-sm text-gray-500 mb-1">{post.date}</div>
                  <a 
                    href={post.url} 
                    className="text-xl text-gray-900 hover:text-gray-600 transition-colors"
                  >
                    {post.title}
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-24">
            <h2 className="text-2xl font-normal mb-8 text-gray-900">Work</h2>
            <ul className="list-disc pl-5 space-y-6 text-lg text-gray-800">
              <li>
                Co-founded Bottle.com with Will. All-in-one software for food entrepreneurs 
                to sell online. Partnered with local business owners to help them create 
                better businesses. (~10M healthy meals sold)
              </li>
              <li>
                Launched Southfork in Atlanta, a virtu