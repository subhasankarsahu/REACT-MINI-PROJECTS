import React, {use, useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){

    const id = useId();

    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className='block mb-1 text-sm font-medium text-slate-700'>{label}</label>}
            <input type={type} className={`w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-slate-400 ${className}`} {...props} ref={ref} />
        </div>
    )
})

export default Input
