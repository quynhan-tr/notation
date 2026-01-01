import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import axios, { AxiosError } from 'axios'
import { UploadData, ConvertResponse } from '../types'
import './HomePage.css'

export default function HomePage() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'
  const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'application/pdf']

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFile = async (file: File) => {
    setError(null)

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Please upload a PNG, JPG image or PDF file.')
      return
    }

    setIsLoading(true)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post<ConvertResponse>(`${BACKEND_URL}/convert`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      const fileBlob = file
      const fileUrl = URL.createObjectURL(fileBlob)

      navigate('/viewer', {
        state: {
          file: fileBlob,
          fileUrl: fileUrl,
          fileName: file.name,
          latex: response.data.latex
        } as UploadData
      })
    } catch (err) {
      const error = err as AxiosError<{ error: string }>
      setError(error.response?.data?.error || 'Failed to convert file. Please try again.')
      setIsLoading(false)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <div 
      className="home-page"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="content-wrapper">
        <h1 className="title">Notation</h1>
        <p className="subtitle">
          An interface for the synthesis of handwritten mathematics into formal markup. Drop a file or click below to begin.
        </p>
        
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileInput}
          accept=".png,.jpg,.jpeg,.pdf"
          style={{ display: 'none' }}
        />
        
        <button 
          className="upload-link" 
          onClick={handleUploadClick}
          disabled={isLoading}
        >
          {isLoading ? 'processing...' : 'upload note'}
        </button>

        {error && <div className="error-message">{error}</div>}
      </div>

      <footer className="footer">
        TYPESET IN COMPUTER MODERN
      </footer>
    </div>
  )
}
