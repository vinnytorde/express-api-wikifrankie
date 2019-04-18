import React from 'react'

const Button = ({ children, variant, ...rest }) => {
  return (
    <button className={`btn btn-${variant}`} {...rest}>
      {children}
    </button>
  )
}

export default Button
