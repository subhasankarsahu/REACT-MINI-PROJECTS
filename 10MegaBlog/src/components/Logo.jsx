import React from 'react'

function Logo({width = "120px"}) {
  return (
    <div style={{ width }} className="inline-flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
        <span className="text-lg font-bold">B</span>
      </div>
      <div className="leading-tight">
        <div className="text-lg font-bold text-slate-900">
          Blog
        </div>
      </div>
    </div>
  )
}

export default Logo
