import { useState } from 'react'
import moment from 'moment'

// const useForm = (name, initial = '', modifier = (e) => e) => {
const useForm = ({
  name,
  type = 'text',
  value: initial = '',
  required = false,
  modifier = v => v,
  validate = v => true
}) => {
  let _initial = initial
  if (type === 'date') {
    _initial = moment(initial).format('YYYY-MM-DD')
  }
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
      let newValue = e.target.value
      if (type === 'checkbox') {
        newValue = !value
      }
      setValue(modifier(newValue))
    }
  }

  const _validation = {
    required,
    valid: !validate(value),
    reset() {
      setValue(initial)
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
