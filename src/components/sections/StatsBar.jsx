import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

const StatsBar = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  })

  const stats = [
    { value: 200, suffix: '+', label: 'Satisfied Clients' },
    { value: 90, suffix: '%', label: 'Satisfied Clients' },
    { value: 28, suffix: '+', label: 'Makeup Experts' },
  ]

  return (
    <div className="overflow-hidden" ref={ref}>
      <div className="counter-area bounce_animation">
        <div className="container">
          <div className="row justify-content-center">
            {stats.map((stat, index) => (
              <div key={index} className="col-md-6 col-xl-3">
                <div className="counter-card_wrapp">
                  <div className="counter-card bounce__anim">
                    <div className="media-body">
                      <h3 className="box-number">
                        {inView ? (
                          <CountUp end={stat.value} duration={2} separator="," />
                        ) : (
                          <span>0</span>
                        )}
                        {stat.suffix}
                      </h3>
                      <p className="box-text">{stat.label}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsBar