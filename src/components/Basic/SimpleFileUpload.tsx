import { useCallback, useEffect, useRef, useState } from 'react'

export const SimpleFileUpload = ({
  onFileUpload,
}: {
  onFileUpload: (data: FileList) => void
}) => {
  const [drag, setDrag] = useState<boolean>(false)
  let dragCounter = 0
  const dropRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDrag(false)
    if (e?.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      onFileUpload(e.dataTransfer.files)
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
  const onChange = () => {
    if (fileRef.current) {
      onFileUpload(fileRef.current.files || new FileList())
    }
  }

  useEffect(() => {
    const div = dropRef.current
    const file = fileRef.current
    if (div) {
      div.addEventListener('dragenter', handleDragEnter)
      div.addEventListener('dragleave', handleDragLeave)
      div.addEventListener('dragover', handleDragOver)
      div.addEventListener('drop', handleDrop)
    }
    if (file) {
      file.addEventListener('change', onChange)
    }
    return () => {
      if (div) {
        div.removeEventListener('dragenter', handleDragEnter)
        div.removeEventListener('dragleave', handleDragLeave)
        div.removeEventListener('dragover', handleDragOver)
        div.removeEventListener('drop', handleDrop)
      }
      if (file) {
        file.removeEventListener('change', onChange)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openFile = useCallback(() => {
    fileRef?.current?.click()
  }, [])

  return (
    <div
      ref={dropRef}
      className={`${
        drag
          ? 'px-3 py-4 border-2 border-gray-400 border-dashed rounded-lg text-center text-gray-500'
          : ''
      }`}
    >
      <input ref={fileRef} type="file" className="hidden" accept=".sce" />
      {drag ? (
        'Drop Here'
      ) : (
        <button
          onClick={openFile}
          className="mr-4 py-2 px-4
          rounded-full border-0 text-sm font-semibold
          bg-blue-50 text-blue-700 hover:bg-blue-100"
        >
          Browse...
        </button>
      )}
    </div>
  )
}
