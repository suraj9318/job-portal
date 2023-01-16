import React from 'react'

const FornRow = ({type,name,value,handleChange,labelText}) => {
  return (
    <div>
        <div className='form-row'>
            <label htmlFor={name} className='form-label'>{labelText || name}</label>
            <input id={name} type={type} name={name} value={value} onChange={handleChange} className="form-input"/>
        </div>
    </div>
  )
}

export default FornRow
