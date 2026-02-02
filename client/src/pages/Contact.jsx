import React from 'react';

const Contact = () => {
  return (
    <div className="bg-rout-paper min-h-screen pt-20 flex items-center justify-center">
      <div className="text-center z-10">
        <h1 className="font-serif text-5xl text-rout-soot mb-8">Let's Connect.</h1>
        <p className="text-rout-soot/60 mb-12">
          Questions, partnerships, or just want to talk tea?
        </p>

        <a href="mailto:hello@rout.tea" className="block text-2xl font-serif text-rout-matcha hover:text-rout-soot transition-colors underline decoration-1 underline-offset-8">
          hello@rout.tea
        </a>
                 <p className="text-rout-soot/40 text-sm mt-8">
                     Kyoto &bull; Taiwan &bull; India <br/>
                     EST. 2026
                 </p>
             </div>
    </div>
  );
};

export default Contact;
