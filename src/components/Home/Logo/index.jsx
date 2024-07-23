import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
import "./index.scss";

const Logo = () => {
  const bgRef = useRef();
  const outlineLogoRef = useRef();
  const solidLogoRef = useRef();

  useLayoutEffect(() => {
    gsap.to(bgRef.current, {
      duration: 1,
      opacity: 1,
    });

    gsap.from(outlineLogoRef.current, {
      strokeDasharray: "1000",
      strokeDashoffset: "1000",
      duration: 20,
    });

    gsap.fromTo(
      solidLogoRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        delay: 2,
        duration: 2,
      }
    );
  }, []);

  return (
    <div className="logo-container" ref={bgRef}>
      <svg
        width="100%"
        height="auto"
        version="1.0"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", bottom: 0 }}
      >
        <g
          className="svg-container"
          transform="translate(0 0) scale(1)"
          fill="none"
        >
          <path
            ref={outlineLogoRef}
            d="M500 100 L500 900 M550 100 L550 900 M450 100 L450 900" // Outline path
            stroke="#ffd700"
            strokeWidth="20"
            fill="none"
          />
          <path
            ref={solidLogoRef}
            d="M500 100 L500 900 M550 100 L550 900 M450 100 L450 900" // Solid path
            stroke="#ff5733"
            strokeWidth="20"
            fill="none"
          />
          <path
            d="M480 120 L480 880 M530 120 L530 880 M430 120 L430 880" // Shadow path
            stroke="#ffd700"
            strokeWidth="20"
            fill="none"
            opacity="0.5"
          />
        </g>
      </svg>
    </div>
  );
};

export default Logo;
