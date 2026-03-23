import React from 'react'

const Loader = () => {
  return (
    <div className="absolute top-0 left-0 right-0 w-full h-screen bg-white flex items-center justify-center">
      <div className="relative w-20 h-20">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#3b82f6] animate-spin" />

        {/* Middle rotating ring - opposite direction */}
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-r-[#3b82f6] opacity-60 animate-spin-reverse" />

        {/* Inner pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#3b82f6] animate-pulse-scale" />
        </div>
      </div>
    </div>
  )
}

export default Loader
