import React, { useState } from 'react'
import useForm from '../hooks/form'

const createSession = credentials => {
  const endpoint = [
    '/api/auth/login',
    {
      method: 'put',
      body: JSON.stringify(credentials)
    }
  ]
  return fetch(...endpoint).then(r => r.json())
}

const Login = props => {
  const username = useForm('username', '')
  const password = useForm('password', '')
  const [error, handleError] = useState(false)

  const routeToArticles = () => props.history.push('/articles')

  const handleSubmit = event => {
    event.preventDefault()
    createSession({ username, password })
      .then(routeToArticles)
      .catch(handleError)
  }

  return (
    <div>
      <form className="col-1-2" onSubmit={handleSubmit}>
        {error && 'error!'}
        <span>username</span>
        <label>
          <input {...username} required type="text" className="input" />
        </label>
        <span>password</span>
        <label>
          <input {...password} required type="password" className="input" />
        </label>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  )
}

export default Login
