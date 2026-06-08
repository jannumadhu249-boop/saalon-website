import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import BlogCard from '../../components/ui/BlogCard'
import SectionTitle from '../../components/ui/SectionTitle'
import { blogPosts } from '../../data/blogPosts'
import { Link } from 'react-router-dom'

const BlogPage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', ...new Set(blogPosts.map(post => post.category))]

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory)

  const recentPosts = blogPosts.slice(0, 3)
  const allTags = [...new Set(blogPosts.flatMap(post => post.tags))]

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' }
  ]

  return (
    <PageWrapper title="Blog">
      <Breadcrumb items={breadcrumbItems} />
      
      <section className="blog-sec space overflow-hidden">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">
              <div className="row justify-content-center mb-5">
                <div className="col-lg-7">
                  <SectionTitle
                    subtitle="Latest Updates"
                    title="Tips & Insights"
                    description="Stay updated with the latest beauty tips, wellness advice, and news from Scuts."
                    align="center"
                  />
                </div>
              </div>

              <div className="row gy-4" ref={ref}>
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    className="col-md-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <BlogCard {...post} />
                  </motion.div>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-5">
                  <p>No posts found in this category.</p>
                </div>
              )}
            </div>

            <div className="col-lg-4">
              <div className="sidebar">
                <div className="widget mb-5">
                  <h3 className="widget_title">Categories</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {categories.map(cat => (
                      <li key={cat} className="mb-2">
                        <button
                          onClick={() => setSelectedCategory(cat)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: selectedCategory === cat ? '#FF752B' : 'inherit',
                            fontWeight: selectedCategory === cat ? 600 : 400,
                            padding: '8px 0',
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%'
                          }}
                        >
                          {cat}
                          <span style={{ color: '#999' }}>
                            ({cat === 'All' ? blogPosts.length : blogPosts.filter(p => p.category === cat).length})
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="widget mb-5">
                  <h3 className="widget_title">Recent Posts</h3>
                  {recentPosts.map(post => (
                    <div key={post.id} className="recent-post mb-3" style={{ display: 'flex', gap: '12px' }}>
                      <img 
                        src={post.image} 
                        alt={post.title}
                        style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                      <div>
                        <h5 style={{ fontSize: '14px', margin: '0 0 4px' }}>
                          <Link to={`/blog/${post.slug}`} style={{ color: 'inherit' }}>
                            {post.title}
                          </Link>
                        </h5>
                        <span style={{ fontSize: '12px', color: '#888' }}>{post.date}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="widget">
                  <h3 className="widget_title">Popular Tags</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {allTags.map(tag => (
                      <Link 
                        key={tag} 
                        to="/blog"
                        style={{
                          padding: '6px 14px',
                          background: '#f9f9f9',
                          borderRadius: '20px',
                          fontSize: '13px',
                          color: 'var(--color-body)'
                        }}
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

export default BlogPage