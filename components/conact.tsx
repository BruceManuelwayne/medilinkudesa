"use client"; 

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Tally: {
      loadEmbeds: () => void;
    };
  }
}

export default function ContactUs() {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;

    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    
    script.onload = () => {
      scriptLoaded.current = true;
      // Multiple attempts to ensure loading
      const loadTally = () => {
        if (window.Tally) {
          window.Tally.loadEmbeds();
        } else {
          // Retry after a short delay
          setTimeout(loadTally, 100);
        }
      };
      
      setTimeout(loadTally, 100);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script if component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <iframe
      data-tally-src="https://tally.so/embed/m6gpKO?hideTitle=1&transparentBackground=1&dynamicHeight=1"
      loading="lazy"
      width="100%"
      height="963"
      frameBorder="0"
      marginHeight={0}
      marginWidth={0}
      title="Sumate al waitlist!"
    />
  );
}