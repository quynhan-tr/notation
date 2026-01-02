import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Home, HelpCircle, Github, Download, Copy } from 'lucide-react'
import MediaViewer from '../components/MediaViewer'
import LaTeXViewer from '../components/LaTeXViewer'
import { UploadData } from '../types'
import './ViewerPage.css'

export default function ViewerPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const data = location.state as UploadData | null
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [copySuccess, setCopySuccess] = useState<boolean>(false)

  const handleCopyLatex = () => {
    if (data?.latex) {
      navigator.clipboard.writeText(data.latex)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }

  useEffect(() => {
    // Redirect to home if no data is available
    if (!data || !data.fileUrl || !data.latex) {
      navigate('/')
    }

    // Cleanup: revoke blob URL when component unmounts
    return () => {
      if (data?.fileUrl) {
        URL.revokeObjectURL(data.fileUrl)
      }
    }
  }, [data, navigate])

  if (!data) {
    return null
  }

  return (
    <div className="viewer-page">
      <nav 
        className="viewer-nav-bar"
        onMouseLeave={() => setHoveredItem(null)}
      >
        <button 
          className={`nav-item ${hoveredItem === 'home' ? 'expanded' : ''}`}
          onMouseEnter={() => setHoveredItem('home')}
          onClick={() => navigate('/')}
        >
          <Home size={20} />
          <span className="nav-text">Home</span>
        </button>
        <button 
          className={`nav-item ${hoveredItem === 'faq' ? 'expanded' : ''}`}
          onMouseEnter={() => setHoveredItem('faq')}
        >
          <HelpCircle size={20} />
          <span className="nav-text">FAQ</span>
        </button>
        <a 
          href="https://github.com/danielquzhao/notation" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`nav-item ${hoveredItem === 'github' ? 'expanded' : ''}`}
          onMouseEnter={() => setHoveredItem('github')}
        >
          <Github size={20} />
          <span className="nav-text">GitHub</span>
        </a>
        <div className="nav-divider"></div>
        <button 
          className={`nav-item ${hoveredItem === 'download' ? 'expanded' : ''}`}
          onMouseEnter={() => setHoveredItem('download')}
        >
          <Download size={20} />
          <span className="nav-text">Download</span>
        </button>
        <button 
          className={`nav-item ${hoveredItem === 'copy' ? 'expanded' : ''}`}
          onMouseEnter={() => setHoveredItem('copy')}
          onClick={handleCopyLatex}
        >
          <Copy size={20} />
          <span className="nav-text">{copySuccess ? 'Copied!' : 'Copy'}</span>
        </button>
      </nav>

      <div className="viewer-content">
        <div className="viewer-panel left-panel">
          <MediaViewer 
            fileUrl={data.fileUrl} 
            fileName={data.fileName} 
            file={data.file} 
          />
        </div>
        <div className="viewer-panel right-panel">
          <LaTeXViewer latex={data.latex} />
        </div>
      </div>
    </div>
  )
}
