// src/components/Footer.jsx
import React from 'react';

function Footer() {

  const currentYear = new Date().getFullYear(); // Dynamically get the current year

  const profileUrlWebsite = "https://ebedimeleck-engineer.vercel.app/"

  return (
    <footer className="bg-indigo-600 text-white p-4  ">
      <div className="max-w-4xl mx-auto text-center text-sm">
        <p>&copy; {currentYear} Feedback Board App. All rights reserved.</p>
        <p className="mt-1">
          crafted by <span role="img" aria-label="heart">❤️</span> ebedi.eng for community feedback.
        </p>
         <p className="mt-2">
          Connect with me:
          <a
            href={profileUrlWebsite}
            target="_blank"            // Opens the link in a new tab
            rel="noopener noreferrer"  // Security best practice for opening new tabs
            className="text-white hover:underline ml-1 font-medium" 
          >
            ebedimeleck
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;