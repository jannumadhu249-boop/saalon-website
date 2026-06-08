import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Matter from 'matter-js'

const MARQUEE_ITEMS = [
  { icon: 'assets/img/icon/star.svg', text: 'Groom Packages' },
  { icon: 'assets/img/icon/star.svg', text: 'Facial care' },
  { icon: 'assets/img/icon/star.svg', text: 'Monthly Packages For Men' },
  { icon: 'assets/img/icon/star.svg', text: 'Hair Care' },
  { icon: 'assets/img/icon/star.svg', text: 'Waxing' },
  { icon: 'assets/img/icon/star.svg', text: 'Skin Care' },
  { icon: 'assets/img/icon/star.svg', text: 'Cuts & Shaves' }
]

const FEATURES_DATA = [
  { subTitle: 'SKINCARE PRODUCTS', title: 'Buy 2 Get 20% off', bg: '#FF6C8E', link: '/shop' },
  { subTitle: 'YOUR SUMMER REFRESH', title: '25% OFF SINGLE', bg: '#FFF', link: '/shop' },
  { subTitle: 'SKINCARE PRODUCTS', title: 'Buy 2 Get 20% off', bg: '#FEC308', link: '/shop' },
  { subTitle: 'SKIN, MASK, GLOW', title: '₹50 OFF SKINCRE', bg: '#FF752B', link: '/shop' },
  { subTitle: 'SKIN, MASK, GLOW', title: '₹50 OFF SKINCRE', bg: '#F3E7E0', link: '/shop' }
]

const MarqueeBanner = () => {
  const sceneRef = useRef(null)

  useEffect(() => {
    // Standard desktop check
    if (window.innerWidth < 768) {
        gsap.set('[data-throwable-el]', { opacity: 1, position: 'relative', top: 0, left: 0 });
        return;
    }
    
    if (!sceneRef.current) return

    const element = sceneRef.current
    const throwables = element.querySelectorAll('[data-throwable-el]')
    const bodies = []
    
    // Matter.js engine setup with performance optimizations
    const engine = Matter.Engine.create({
        enableSleeping: true // Save CPU when items are still
    })
    const runner = Matter.Runner.create()
    const world = engine.world
    
    engine.gravity.y = 0.8

    const width = element.offsetWidth || window.innerWidth
    const height = element.offsetHeight || 500

    // Physics Boundaries (Floor and Sides)
    const ground = Matter.Bodies.rectangle(width / 2, height + 50, width * 2, 100, { isStatic: true })
    const leftWall = Matter.Bodies.rectangle(-50, height / 2, 100, height * 2, { isStatic: true })
    const rightWall = Matter.Bodies.rectangle(width + 50, height / 2, 100, height * 2, { isStatic: true })
    
    Matter.Composite.add(world, [ground, leftWall, rightWall])

    // Pre-set visibility to avoid the "missing" problem
    gsap.set(throwables, { opacity: 1 });

    // Create physics bodies for each throwable item
    throwables.forEach((el, index) => {
      const rect = el.getBoundingClientRect()
      
      // GSAP quickSetters for high performance 
      const xSetter = gsap.quickSetter(el, "x", "px")
      const ySetter = gsap.quickSetter(el, "y", "px")
      
      const startX = gsap.utils.random(rect.width, width - rect.width)
      const startY = -300 - (index * 120) 
      
      const body = Matter.Bodies.rectangle(startX, startY, rect.width || 150, rect.height || 60, {
        chamfer: { radius: 30 }, 
        restitution: 0.5,
        friction: 0.1,
        isStatic: true
      })
      
      bodies.push(body)
      Matter.Composite.add(world, [body])

      // Tick listener to sync DOM elements with Matter.js bodies
      Matter.Events.on(runner, "tick", () => {
        if (runner.enabled && !body.isStatic) {
          ySetter(body.position.y)
          xSetter(body.position.x)
          el.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`
        }
      })
    })

    // Interaction Setup
    const mouse = Matter.Mouse.create(element)
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    })
    Matter.Composite.add(world, [mouseConstraint])

    // Start the physics rain logic
    const startRain = () => {
        throwables.forEach((el, i) => {
            setTimeout(() => {
                if (bodies[i]) Matter.Body.setStatic(bodies[i], false);
            }, i * 100);
        });
    }

    // Use a simpler trigger for the rain
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        startRain();
        observer.disconnect();
      }
    }, { threshold: 0.01 }); // Very low threshold to trigger early
    
    observer.observe(element);

    // Fallback: trigger after 1.5s anyway to be safe
    const fallback = setTimeout(startRain, 1500);

    // Optimization: Pause runner strictly when not visible
    const runnerObserver = new IntersectionObserver(([entry]) => {
      runner.enabled = entry.isIntersecting
    }, { threshold: 0.05 })
    
    runnerObserver.observe(element)

    // Start the engine
    Matter.Runner.run(runner, engine)

    return () => {
      clearTimeout(fallback);
      Matter.Runner.stop(runner)
      Matter.Engine.clear(engine)
      observer.disconnect()
      runnerObserver.disconnect()
    }
  }, [])

  return (
    <div className="promotion-area position-relative overflow-hidden space">
      <style>{`
        .marquee {
          overflow: hidden;
          width: 100%;
          display: flex;
          padding: 40px 0;
          position: relative;
          z-index: 5;
        }
        .marquee-group {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: space-around;
          min-width: 100%;
          gap: 60px;
          animation: marquee-scroll 30s linear infinite;
          will-change: transform;
        }
        .marquee-group .item {
          display: flex;
          align-items: center;
          gap: 20px;
          font-family: var(--title-font);
          font-size: 64px;
          font-weight: 500;
          color: #fff;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .marquee-group .item img {
          width: 40px;
          height: 40px;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        [data-throwable-el] {
          position: absolute;
          z-index: 10;
          cursor: grab;
          user-select: none;
          pointer-events: auto;
          will-change: transform;
          opacity: 1; /* Ensure visible immediately */
        }
        [data-throwable-el]:active {
          cursor: grabbing;
        }
        .feature-wrap1.style3 {
          position: relative;
          width: 100%;
          height: 500px;
          overflow: visible;
        }
        .promotion-bg {
          position: relative;
          width: 100%;
          height: 500px;
          background-color: #121214;
          border-radius: 20px;
          overflow: hidden;
        }
      `}</style>
      
      <div className="container">
        <div className="promotion-bg">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 0 }}
          >
            <source src="assets/img/bg/promotion.mp4" type="video/mp4" />
          </video>
          
          <div className="feature-wrap1 style3" data-throwable-scene="true" ref={sceneRef}>
            {FEATURES_DATA.map((feature, index) => (
              <div key={index} data-throwable-el="">
                <span className="feature-item" style={{ backgroundColor: feature.bg }}>
                  <span className="box-content">
                    <span className="sub-title">{feature.subTitle}</span>
                    <span className="box-title">{feature.title}</span>
                    <Link to={feature.link} className="icon-btn">
                       <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </span>
                </span>
              </div>
            ))}
            <div data-throwable-el="">
                <span className="feature-item button">
                    <Link to="/services" className="line-btn">
                        EXPLORE ALL <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container-fluid px-0">
        <div className="marquee">
          <div className="marquee-group">
            {MARQUEE_ITEMS.map((item, index) => (
              <div key={index} className="item">
                <img src={item.icon} alt="" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          <div aria-hidden="true" className="marquee-group">
            {MARQUEE_ITEMS.map((item, index) => (
              <div key={index} className="item">
                <img src={item.icon} alt="" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarqueeBanner