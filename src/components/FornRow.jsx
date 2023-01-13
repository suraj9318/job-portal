import React from 'react'

const FornRow = ({type,name,value,handleChange,labelText}) => {
  return (
    <div>
        <div className='form-row'>
            <label htmlFor={name} className='form-label'>{name}</label>
            <input type={type} name={name} value={value} onChange={handleChange} className="form-input"/>
        </div>
    </div>
  )
}

export default FornRow
