import React from 'react'
import useForm from '../hooks/form'

const Search = props => {
  const search = useForm('search')

  const handleSubmit = event => {
    event.preventDefault()
    // search table algo
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" {...search} />
      <input type="submit" />
    </form>
  )
}

export default Search
