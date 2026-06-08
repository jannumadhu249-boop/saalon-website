import { useState, useEffect } from 'react'

const Loader = ({ fullPage = false }) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  const content = (
    <div id="preloader">
      <div className="preloader-bg preloader-bg-one"></div>
      <div className="preloader-bg preloader-bg-two"></div>
      <div className="txt-loading">
        <span data-text-preloader="S" className="letters-loading">S</span>
        <span data-text-preloader="C" className="letters-loading">C</span>
        <span data-text-preloader="U" className="letters-loading">U</span>
        <span data-text-preloader="T" className="letters-loading">T</span>
        <span data-text-preloader="S" className="letters-loading">S</span>
      </div>
    </div>
  )

  if (fullPage) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: '#121214',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        {content}
      </div>
    )
  }

  return content
}

export default Loader