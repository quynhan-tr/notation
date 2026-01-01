import { motion } from 'framer-motion'

interface FloatingNoteProps {
  className?: string
  delay?: number
  rotate?: number
  content?: string[]
}

export function FloatingNote({
  className = '',
  delay = 0,
  rotate = 0,
  content = ['∫ f(x)dx', 'dy/dx = 2x', '∑ n²']
}: FloatingNoteProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        rotate: rotate - 5,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate,
      }}
      transition={{
        duration: 1.8,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1 },
      }}
      className={className}
      style={{
        position: 'absolute',
        width: '140px',
        height: '180px',
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        padding: '16px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }}
    >
      <motion.div
        animate={{
          y: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {content.map((line, idx) => (
          <div
            key={idx}
            style={{
              color: '#1f2937',
              fontFamily: "'Computer Modern', 'CMU Serif', 'Latin Modern Roman', Georgia, serif",
              fontStyle: 'italic',
              fontSize: '18px',
            }}
          >
            {line}
          </div>
        ))}
      </motion.div>
      <div
        style={{
          position: 'absolute',
          bottom: '-8px',
          right: '-8px',
          borderRadius: '50%',
          backgroundColor: '#3b82f6',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>∫</span>
      </div>
    </motion.div>
  )
}

export default FloatingNote
