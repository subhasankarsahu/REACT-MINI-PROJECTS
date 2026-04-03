import React from 'react'

function Button({ 
    children,
    type = 'button',
    bgColor = 'bg-blue-500',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  return (
    <button className={`rounded-xl px-4 py-2 font-medium ${bgColor} ${textColor} ${className}`} type={type} {...props}>
        {children}
    </button>
  )
}

export default Button
