import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CtaBanner = () => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const thumbRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 526;
    
    if (isMobile) {
      gsap.set([cardRef.current, thumbRef.current], { scale: 1, y: 0, opacity: 1, xPercent: cardRef.current ? -50 : 0 });
      return;
    }

    // Capture initial GSAP state exactly as in demo/main.js
    gsap.set(cardRef.current, {
      scale: 0,
      y: 100,
      xPercent: -50, // Preserves the CSS translateX(-50%)
      opacity: 0,
      transformOrigin: "center center",
      willChange: "transform, opacity"
    });

    const trigger1 = ScrollTrigger.create({
      trigger: thumbRef.current,
      start: "top 80%",
      end: "top 50%",
      scrub: 1,
      animation: gsap.to(cardRef.current, {
        scale: 1,
        y: 0,
        opacity: 1,
        ease: "power1.out",
        duration: 1.5
      })
    });

    const trigger2 = ScrollTrigger.create({
      trigger: thumbRef.current,
      start: "top 80%",
      end: "top 50%",
      scrub: 1,
      animation: gsap.to(thumbRef.current, {
        scale: 1,
        borderRadius: "0px",
        width: "100%",
        top: "0",
        ease: "linear"
      })
    });

    return () => {
      trigger1.kill();
      trigger2.kill();
    };
  }, []);

  return (
    <div className="cta-area space" ref={containerRef}>
      <div className="cta-thumb3-1">
        <div className="cta-trigger-wrapper">
          <img 
            ref={thumbRef}
            alt="img" 
            className="cta-trigger-thumb" 
            src="assets/img/bg/cta-image.jpg" 
          />
          <div className="cta-card-wrapp" ref={cardRef}>
            <div className="box-img">
            </div>
            <div className="box-content">
              <div className="cta-logo">
                <img alt="" src="assets/img/shape/logo.svg" />
              </div>
              <p className="box-text">
                Let’s make this about you. A quiet moment for thoughtful treatments designed to restore balance and highlight your natural charm. Because feeling good starts here.
              </p>
              <Link className="th-btn" to="/contact">
                FIND US
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaBanner;