import React, { useEffect, useRef } from 'react';

const GhostSubscribeForm = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Create the script element
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/ghost/signup-form@~0.2/umd/signup-form.min.js';
    script.async = true;
    
    // Add the data attributes
    script.dataset.backgroundColor = '#ffffff';
    script.dataset.textColor = '#000000';
    script.dataset.buttonColor = '#000000';
    script.dataset.buttonTextColor = '#FFFFFF';
    script.dataset.title = 'Andy Blechman';
    script.dataset.description = '';
    script.dataset.site = 'https://blog.andyblechman.com/';
    script.dataset.locale = 'en';
    
    // Append to the container
    if (containerRef.current) {
      // Clear any existing content first
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(script);
    }
    
    // Cleanup function to remove the script when component unmounts
    return () => {
      if (containerRef.current) {
        const scriptElement = containerRef.current.querySelector('script');
        if (scriptElement) {
          scriptElement.remove();
        }
      }
    };
  }, []);
  
  return (
    <section id="subscribe" className="mt-20 mb-10 pt-10 border-t border-gray-200">
      <h2 className="text-xl font-normal mb-6 text-center">Subscribe for email alerts about new posts:</h2>
      <div 
        ref={containerRef}
        className="max-w-md mx-auto" 
        style={{ height: '40vmin', minHeight: '360px' }}
      />
    </section>
  );
};

export default GhostSubscribeForm;