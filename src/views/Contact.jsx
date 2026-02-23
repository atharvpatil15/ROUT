"use client";

import React from 'react';

const Contact = () => {
  return (
    <div className="bg-tl-paper min-h-screen pt-20 flex items-center justify-center">
      <div className="text-center z-10">
        <h1 className="font-serif text-5xl text-tl-soot mb-8">Let's Connect.</h1>
        <p className="text-tl-soot/60 mb-12">
          Questions, partnerships, or just want to talk tea?
        </p>

        <a href="mailto:hello@threadedleaves.tea" className="block text-2xl font-serif text-tl-matcha hover:text-tl-soot transition-colors underline decoration-1 underline-offset-8">
          hello@threadedleaves.tea
        </a>
                 <p className="text-tl-soot/40 text-sm mt-8">
                     Kyoto &bull; Taiwan &bull; India <br/>
                     EST. 2026
                 </p>
             </div>
    </div>
  );
};

export default Contact;
