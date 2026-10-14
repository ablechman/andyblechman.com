import React from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../posts';
import { formatDate } from '../lib/frontmatter';
import { useTitle } from '../Layout';
import { SubscribeBox } from '../components/Subscribe';

const link = 'underline decoration-gray-500 hover:decoration-gray-900 font-medium';

const Home = () => {
  useTitle('');
  const featured = posts.slice(0, 5);

  return (
    <>
      <header className="mb-10">
        <h1 className="text-3xl font-normal mb-6">Andy Blechman</h1>
        <div className="text-lg leading-relaxed space-y-4">
          <p>
            I'm the cofounder of{' '}
            <a href="https://bottle.com" target="_blank" rel="noopener noreferrer" className={link}>
              Bottle.com
            </a>
            , a business-in-a-box for local food entrepreneurs.
          </p>
          <p>
            I've spent the bulk of my{' '}
            <a href="#work" className={link}>
              career
            </a>{' '}
            as a founder building companies from zero to one.
          </p>
          <p>
            Currently, I'm most interested in how physiological behaviors like sleep and exercise can
            improve human performance at work and in sports.
          </p>
        </div>
      </header>

      <main>
        <section id="work" className="mb-12">
          <h2 className="text-xl font-normal mb-6">Work</h2>
          <ul className="list-disc pl-5 space-y-4">
            <li className="text-lg leading-relaxed">
              2015 - 2025: Cofounder of{' '}
              <a href="https://bottle.com" target="_blank" rel="noopener noreferrer" className={link}>
                Bottle.com
              </a>{' '}
              with{' '}
              <a href="https://www.secondbreakfast.co/" target="_blank" rel="noopener noreferrer" className={link}>
                Will
              </a>
              . Bottle is an all-in-one software for food entrepreneurs to sell online. We partner with local
              business owners to help them build stronger businesses and win online. Incredibly proud of what
              we've built and our impact.
            </li>
            <li className="text-lg leading-relaxed">
              2014 - 2015: I launched Southfork in Atlanta, a virtual cafeteria concept for large companies. I
              was fortunate to partner with many of Atlanta's top businesses including King and Spalding, Cox,
              and MailChimp. Developed a deep understanding of food delivery and the challenges of building a
              local delivery business before pivoting to Bottle.
            </li>
            <li className="text-lg leading-relaxed">
              2012 - 2014: I had two tours at SiteCompli with{' '}
              <a href="https://www.linkedin.com/in/jgnyc/" target="_blank" rel="noopener noreferrer" className={link}>
                Jason
              </a>{' '}
              and{' '}
              <a href="https://www.linkedin.com/in/rossgoldenberg/" target="_blank" rel="noopener noreferrer" className={link}>
                Ross
              </a>
              . I was initially brought on to develop a system to grow headcount from 5 to 20. During business
              school, I returned for a second stint to implement a recruiting and training process as the
              company scaled from 20 to 40 employees following a significant capital injection.
            </li>
            <li className="text-lg leading-relaxed">
              2009 - 2012: I was a cofounder at{' '}
              <a href="https://accordion.com" target="_blank" rel="noopener noreferrer" className={link}>
                Accordion
              </a>
              , joining the company pre-revenue and pre-funding. I learned what it takes to start a business
              and get to product-market fit. I wore a lot of hats as the COO where I focused on staffing,
              recruiting, and business operations. Accordion exited to Charlesbank in 2022.
            </li>
            <li className="text-lg leading-relaxed">
              2006 - 2009: I started off in finance because it was what my friends in college were doing. I
              wish I'd been more thoughtful here, but it worked out.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-normal mb-6">Featured Writing</h2>
          <div className="space-y-4">
            {featured.map((post) => (
              <div key={post.slug}>
                <div className="text-sm text-gray-500 mb-1">{formatDate(post.date, 'short')}</div>
                <Link to={`/blog/${post.slug}`} className={`text-lg ${link}`}>
                  {post.title}
                </Link>
              </div>
            ))}

            <div className="mt-6">
              <Link
                to="/blog"
                className="text-sm font-medium text-gray-900 underline decoration-gray-500 hover:decoration-gray-900"
              >
                Read more posts →
              </Link>
            </div>
          </div>
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
              I live outside Atlanta with my wife,{' '}
              <a href="https://www.linkedin.com/in/meredith-blechman/" target="_blank" rel="noopener noreferrer" className={link}>
                Meredith
              </a>
              , and our three amazing kids. In 2022, we moved to a small community 30 minutes south of ATL.
              It's a great place to raise a family, filled with wonderful people and an incredible trail running
              system.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-normal mb-6">Connect</h2>
          <ul className="list-disc pl-5 space-y-3">
            <li className="text-lg leading-relaxed">
              <a href="https://linkedin.com/in/andyblechman" target="_blank" rel="noopener noreferrer" className={link}>
                LinkedIn
              </a>
            </li>
            <li className="text-lg leading-relaxed">
              <a href="mailto:andrew.n.blechman@gmail.com" className={link}>
                andrew.n.blechman@gmail.com
              </a>
            </li>
          </ul>
        </section>

        <SubscribeBox />
      </main>
    </>
  );
};

export default Home;
