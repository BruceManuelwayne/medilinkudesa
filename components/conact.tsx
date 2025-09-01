import Script from "next/script";

declare global {
  interface Window {
    Tally: {
      loadEmbeds: () => void;
    };
  }
}

export default function ContactUs() {
  return (
    <>
      <iframe
        data-tally-src="https://tally.so/embed/m6gpKO?hideTitle=1&transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="963"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Sumate al waitlist!"
      ></iframe>

      <Script
        id="tally-js"
        src="https://tally.so/widgets/embed.js"
        onLoad={() => {
          if (window.Tally) {
            window.Tally.loadEmbeds();
          }
        }}
      />
    </>
  );
}