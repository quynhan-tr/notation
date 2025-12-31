import { useState } from 'react'
import { BlockMath } from 'react-katex'
import './LaTeXViewer.css'

export default function LaTeXViewer({ latex }) {
  const [activeTab, setActiveTab] = useState('rendered')
  const [copySuccess, setCopySuccess] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(latex)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="latex-viewer">
      <div className="latex-header">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'rendered' ? 'active' : ''}`}
            onClick={() => setActiveTab('rendered')}
          >
            Rendered
          </button>
          <button
            className={`tab ${activeTab === 'raw' ? 'active' : ''}`}
            onClick={() => setActiveTab('raw')}
          >
            Raw Code
          </button>
        </div>
      </div>

      <div className="latex-content">
        {activeTab === 'rendered' ? (
          <div className="rendered-view">
            <BlockMath math={latex} />
          </div>
        ) : (
          <div className="raw-view">
            <button className="copy-button" onClick={handleCopy}>
              {copySuccess ? '✓ Copied!' : 'Copy'}
            </button>
            <pre className="latex-code">
              <code>{latex}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
