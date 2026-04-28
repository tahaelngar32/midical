import React from 'react'

export const Logo: React.FC<{}> = () => {
    return (
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[#e5e7eb]">
        <div className="w-7 h-7 rounded-lg bg-[#4988C4] flex items-center justify-center">
          <i className="fa-solid fa-heart-pulse text-white text-xs" />
        </div>

        <span className="font-semibold text-gray-800 text-sm">MediDash</span>
      </div>
    );
}