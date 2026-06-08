import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import BlogCard from '../../components/ui/BlogCard'
import { blogPosts } from '../../data/blogPosts'

const BlogDetailsPage = () => {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [comment, setComment] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  if (!post) {
    return (
      <PageWrapper title="Post Not Found">
        <div className="container py-5">
          <div className="text-center">
            <h2>Post Not Found</h2>
            <p>The article you're looking for doesn't exist.</p>
            <Link to="/blog" className="th-btn style1">Back to Blog</Link>
          </div>
        </div>
      </PageWrapper>
    )
  }

  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3)

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    console.log('Comment submitted:', { name, email, comment })
    setComment('')
    setName('')
    setEmail('')
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: post.title, path: `/blog/${slug}` }
  ]

  return (
    <PageWrapper title={post.title}>
      <Breadcrumb items={breadcrumbItems} />
      
      <section className="blog-details space overflow-hidden">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <div className="blog-detail-image mb-4">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    style={{ width: '100%', borderRadius: '16px' }}
                  />
                </div>

                <div className="blog-meta mb-4" style={{ display: 'flex', gap: '20px', color: '#888' }}>
                  <span><i className="fas fa-calendar"></i> {formattedDate}</span>
                  <span><i className="fas fa-user"></i> {post.author}</span>
                  <span><i className="fas fa-folder"></i> {post.category}</span>
                  <span><i className="fas fa-clock"></i> {post.readTime}</span>
                </div>

                <h1 style={{ fontFamily: 'var(--font-heading)', marginBottom: '20px' }}>
                  {post.title}
                </h1>

                <div className="blog-content" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                  <p style={{ color: 'var(--color-body)', marginBottom: '20px' }}>
                    {post.excerpt}
                  </p>
                  <p style={{ color: 'var(--color-body)', marginBottom: '20px' }}>
                    {post.content}
                  </p>
                  <p style={{ color: 'var(--color-body)' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>

                <div className="blog-tags mt-5 mb-5" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {post.tags.map(tag => (
                    <Link 
                      key={tag} 
                      to="/blog"
                      style={{
                        padding: '6px 14px',
                        background: '#f9f9f9',
                        borderRadius: '20px',
                        fontSize: '13px'
                      }}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>

                <div className="author-box mt-5 p-4" style={{ background: '#f9f9f9', borderRadius: '12px' }}>
                  <div className="d-flex gap-4">
                    <img 
                      src={post.authorImage} 
                      alt={post.author}
                      style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                    />
                    <div>
                      <h4 style={{ marginBottom: '8px' }}>{post.author}</h4>
                      <p style={{ color: 'var(--color-body)', margin: 0 }}>
                        Expert beauty and wellness writer sharing insights on spa treatments, 
                        skincare, and holistic health.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="comments-section mt-5">
                  <h3 className="mb-4">Leave a Comment</h3>
                  <form onSubmit={handleCommentSubmit} className="comment-form">
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <input 
                          type="text" 
                          placeholder="Your Name" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          style={{ 
                            width: '100%', 
                            padding: '12px 16px', 
                            border: '1px solid #ddd', 
                            borderRadius: '8px' 
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <input 
                          type="email" 
                          placeholder="Your Email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          style={{ 
                            width: '100%', 
                            padding: '12px 16px', 
                            border: '1px solid #ddd', 
                            borderRadius: '8px' 
                          }}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <textarea 
                        placeholder="Your Comment" 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        rows={5}
                        style={{ 
                          width: '100%', 
                          padding: '12px 16px', 
                          border: '1px solid #ddd', 
                          borderRadius: '8px',
                          resize: 'vertical'
                        }}
                      />
                    </div>
                    <button type="submit" className="th-btn style1">
                      Submit Comment
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>

            <div className="col-lg-4">
              <div className="sidebar">
                {relatedPosts.length > 0 && (
                  <div className="widget">
                    <h3 className="widget_title">Related Posts</h3>
                    {relatedPosts.map(rel => (
                      <BlogCard key={rel.id} {...rel} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

export default BlogDetailsPage