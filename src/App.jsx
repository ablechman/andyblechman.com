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
      <div className="max-w-[550px] mx-auto pt-24 pb-10 px-4">
        <header className="mb-40">
          <h1 className="text-4xl font-normal mb-10">Andy Blechman</h1>
          <p className="text-xl leading-relaxed">
            Cofounder of Bottle.com, a business-in-a-box for local food entrepreneurs. Currently I'm interested in the ways physiology and psychology affect human performance. 
          </p>
        </header>

        <main>
          <section className="mb-32">
            <h2 className="text-2xl font-normal mb-10">Featured Writing</h2>
            <div className="space-y-10">
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

          {/* Keep the rest of the sections the same */}
        </main>
      </div>
    </div>
  )
}

export default App