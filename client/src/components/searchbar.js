import React from 'react'
import useForm from '../hooks/form'

const Search = props => {
  const search = useForm({ name: 'search', type: 'text' })

  const handleSubmit = event => {
    event.preventDefault()
    // search table algo
  }

  return (
    <form onSubmit={handleSubmit}>
      <input {...search} />
      <input type="submit" />
    </form>
  )
}

export default Search
