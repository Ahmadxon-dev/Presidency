import { X } from 'lucide-react'
import { useEffect } from 'react'

const ImageModal = ({ image, onClose }) => {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [onClose])

    if (!image) return null

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="relative max-w-4xl w-full bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white dark:bg-slate-800 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    aria-label="Close modal"
                >
                    <X size={24} className="text-slate-900 dark:text-white" />
                </button>

                <img
                    src={image || '/placeholder.svg'}
                    alt="Midterm document"
                    className="w-full h-auto max-h-[80vh] object-contain"
                />
            </div>
        </div>
    )
}

export default ImageModal
