import { ReactNode } from 'react'

export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div
        className="relative bg-white overflow-hidden shadow-2xl"
        style={{ width: 390, height: 844, borderRadius: 48 }}
      >
        {/* Status bar */}
        <div className="absolute top-0 inset-x-0 h-12 flex items-center justify-between px-8 pt-2 z-50 bg-white">
          <span className="text-xs font-semibold">9:41</span>
          <div className="w-24 h-6 bg-black rounded-full" />
          <span className="text-xs font-semibold">100%</span>
        </div>
        {/* Content */}
        <div className="absolute inset-0 pt-12 flex flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}
