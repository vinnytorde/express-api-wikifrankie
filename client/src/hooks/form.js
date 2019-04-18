import { useState } from 'react'

const useFormSet = (name, initial = '') => {
  const [value, setValue] = useState(initial)
  return {
    name,
    value,
    onChange(e) {
      setValue(e.target.value)
    },
    [`set${name}`]: setValue
  }
}

export default useFormSet
