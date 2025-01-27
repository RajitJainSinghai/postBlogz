
import React ,{useId} from 'react'

function Select({
    option,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className='' ></label>}
        <select {...props} ref={ref} id={id} className={`w-full p-2 border ${className}`}>
            {option?.map((option) => (
                <Option key={option} value={option}>
                    {option}
                </Option>
            ))}

        </select>
    </div>
  )
}

export default React.forwardRef(Select)