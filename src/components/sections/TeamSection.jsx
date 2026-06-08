// import { useInView } from 'react-intersection-observer'
// import { motion } from 'framer-motion'
// import { team } from '../../data/team'
// import TeamCard from '../ui/TeamCard'
// import SectionTitle from '../ui/SectionTitle'
// import { Link } from 'react-router-dom'

// const TeamSection = () => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   })

//   const displayTeam = team.slice(0, 4)

//   return (
//     <section className="team-sec space overflow-hidden" ref={ref}>
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-lg-7">
//             <SectionTitle
//               subtitle="Our Team"
//               title="Meet Our Expert Beauticians"
//               description="Our talented team of professionals is dedicated to providing you with the best beauty services."
//               align="center"
//             />
//           </div>
//         </div>

//         <div className="row gy-4">
//           {displayTeam.map((member, index) => (
//             <motion.div
//               key={member.id}
//               className="col-md-6 col-xl-3"
//               initial={{ opacity: 0, y: 30 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//             >
//               <TeamCard {...member} />
//             </motion.div>
//           ))}
//         </div>

//         <div className="text-center mt-5">
//           <Link to="/team" className="th-btn style2">
//             View All Team Members
//           </Link>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default TeamSection




import React from 'react';

const TeamSection = () => {
  const team = [
    { name: 'Julia Jany', img: 'team_1_1.png' },
    { name: 'Michel Liu', img: 'team_1_2.png' },
    { name: 'Maria Garcia', img: 'team_1_3.png' },
    { name: 'Jenny Wilson', img: 'team_1_4.png' },
    { name: 'Olivia Brown', img: 'team_1_5.png' },
    { name: 'Tony Mari', img: 'team_1_6.png' },
  ];

  return (
    <section className="team-sec">
      <div className="container z-index-common">
        <div className="title-area text-center">
          <h2 className="sec-title text-anime-style-3 text-white">Our Talented Team</h2>
          <span className="title-img">
            <img alt="shape" src="assets/img/theme-img/title_shape.svg" />
          </span>
        </div>
        <div className="row gy-3">
          {team.map((member, idx) => (
            <div key={idx} className="col-md-6 col-xl-4">
              <div className="th-team team-card">
                <div className="box-img">
                  <img alt="Team" src={`assets/img/team/${member.img}`} />
                </div>
                <div className="box-content">
                  <div className="team-social">
                    <a className="icon-btn" href="team-details.html">
                      <img alt="" src="assets/img/icon/arrow-right2.svg" />
                    </a>
                  </div>
                  <div className="button-marquee">
                    <div className="button">
                      {[...Array(5)].map((_, i) => (
                        <React.Fragment key={i}>
                          <a className="text" href="team-details.html">VIEW DETAIL</a>
                          <span className="img"><img alt="" src="assets/img/icon/flower.svg" /></span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="box-title"><a href="team-details.html">{member.name}</a></h3>
                    <span className="team-desig">Beautician</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;