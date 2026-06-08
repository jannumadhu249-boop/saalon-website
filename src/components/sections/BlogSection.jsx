// import { useInView } from 'react-intersection-observer'
// import { motion } from 'framer-motion'
// import { blogPosts } from '../../data/blogPosts'
// import BlogCard from '../ui/BlogCard'
// import SectionTitle from '../ui/SectionTitle'
// import { Link } from 'react-router-dom'

// const BlogSection = () => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   })

//   const displayPosts = blogPosts.slice(0, 3)

//   return (
//     <section className="blog-sec space overflow-hidden" ref={ref}>
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-lg-7">
//             <SectionTitle
//               subtitle="Latest News"
//               title="Tips & Insights From Our Blog"
//               description="Stay updated with the latest beauty tips, wellness advice, and news from Schun."
//               align="center"
//             />
//           </div>
//         </div>

//         <div className="row gy-4">
//           {displayPosts.map((post, index) => (
//             <motion.div
//               key={post.id}
//               className="col-md-6 col-lg-4"
//               initial={{ opacity: 0, y: 30 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//             >
//               <BlogCard {...post} />
//             </motion.div>
//           ))}
//         </div>

//         <div className="text-center mt-5">
//           <Link to="/blog" className="th-btn style2">
//             View All Posts
//           </Link>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default BlogSection




import React from 'react';

const BlogSection = () => {
  const posts = [
    { id: 1, title: 'Master Your Morning Beauty Routine Essential Tips for a Flawless Day Look', date: '08', month: 'Sep, 2025', img: 'blog_1_1.jpg' },
    { id: 2, title: 'Elevate Your Morning Beauty Ritual Strategies for a Stunning All-Day Glow', date: '19', month: 'Sep, 2025', img: 'blog_1_2.jpg' },
    { id: 3, title: 'Essential Tips for a Flawless Ritual Strategies for the All-Day Glow Looks', date: '29', month: 'Sep, 2025', img: 'blog_1_3.jpg' },
  ];

  return (
    <section className="overflow-hidden space overflow-hidden" id="blog-sec">
      <div className="container">
        <div className="row justify-content-lg-between justify-content-center align-items-end">
          <div className="col-lg-7">
            <div className="title-area text-center text-lg-start">
              <h2 className="sec-title text-anime-style-3 text-white">Latest News & Updates</h2>
              <span className="title-img">
                <img alt="shape" src="assets/img/theme-img/title_shape.svg" />
              </span>
            </div>
          </div>
          <div className="col-auto">
            <div className="sec-btn">
              <a className="th-btn2 th-icon" href="blog.html">BROWSE ALL</a>
            </div>
          </div>
        </div>
        <div className="row gy-4 justify-content-center bounce_animation">
          {posts.map(post => (
            <div key={post.id} className="col-md-6 col-xl-4 bounce__anim">
              <div className="blog-card">
                <div className="blog-meta">
                  <a href="blog.html"><i className="fa-solid fa-user"></i> By Sarah Jack</a>
                  <a href="blog.html"><i className="fa-solid fa-tags"></i> Face Laser</a>
                </div>
                <h3 className="box-title">
                  <a href="blog-details.html">{post.title}</a>
                </h3>
                <div className="box-wrapp">
                  <div className="box-img global-img">
                    <img alt="blog image" src={`assets/img/blog/${post.img}`} />
                  </div>
                  <a className="date" href="blog.html">
                    <span className="day">{post.date}</span>
                    <span className="year">{post.month}</span>
                  </a>
                </div>
                <div className="box-content">
                  <p className="box-text">“The customer service I received from the solar panel company exceptional.”</p>
                  <a className="th-btn2 style2 th-icon" href="blog-details.html">Read More</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;