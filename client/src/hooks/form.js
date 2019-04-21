import { useState } from 'react'

const useForm = ({
  name,
  type = 'text',
  value: initial = '',
  required = false,
  modifier = v => v,
  validate = v => true
}) => {
  let _initial = initial

  const [value, setValue] = useState(_initial)

  const _name = { name }
  const _type = { type }

  const _value = {}
  if (type === 'checkbox') {
    _value.checked = !!value
  } else {
    _value.value = value
  }

  const _onChange = {
    onChange(e) {
      let newValue
      if (type === 'checkbox') {
        newValue = !value
      } else if (type === 'date') {
        newValue = e
      } else {
        newValue = e.target.value
      }
      setValue(modifier(newValue))
    }
  }

  const _validation = {
    required,
    valid: !validate(value),
    reset() {
      setValue(_initial)
    }
  }

  return {
    ..._name,
    ..._type,
    ..._value,
    ..._onChange,
    ..._validation
  }
}

export default useForm
