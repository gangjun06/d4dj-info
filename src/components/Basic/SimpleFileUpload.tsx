import { useEffect, useRef, useState } from 'react'

export const SimpleFileUpload = () => {
  const [drag, setDrag] = useState<boolean>(false)
  let dragCounter = 0
  const dropRef = useRef<HTMLDivElement>(null)

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDrag(false)
    if (e?.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      console.log(e.dataTransfer.files)
      dragCounter = 0
    }
  }

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter++
    if (e?.dataTransfer?.items && e.dataTransfer.items.length > 0) {
      setDrag(true)
    }
  }
  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter--
    if (dragCounter === 0) {
      setDrag(false)
    }
  }
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  useEffect(() => {
    const div = dropRef.current
    if (div) {
      div.addEventListener('dragenter', handleDragEnter)
      div.addEventListener('dragleave', handleDragLeave)
      div.addEventListener('dragover', handleDragOver)
      div.addEventListener('drop', handleDrop)
    }
    return () => {
      if (div) {
        div.removeEventListener('dragenter', handleDragEnter)
        div.removeEventListener('dragleave', handleDragLeave)
        div.removeEventListener('dragover', handleDragOver)
        div.removeEventListener('drop', handleDrop)
      }
    }
  }, [])

  return (
    <div
      ref={dropRef}
      className={`border-2 px-3 py-4 border-gray-400 border-dashed rounded-lg ${
        drag ? 'cursor-copy' : 'cursor-pointer'
      }`}
    >
      Browse or drop image
    </div>
  )
}
