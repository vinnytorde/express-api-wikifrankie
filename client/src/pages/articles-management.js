import React, { useState, useEffect } from 'react'
import useForm from '../hooks/form'
import Button from '../components/button'

const fetchArticle = id => {
  const endpoint = [
    `/articles/${id}`,
    {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  ]
  return fetch(...endpoint).then(r => r.json())
}

const saveArticle = article => {
  const endpoint = [
    '/articles',
    {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(article)
    }
  ]
  return fetch(...endpoint).then(r => r.json())
}

const ArticlesManagement = props => {
  const [id, setId] = useState()
  const topic = useForm('topic', '')
  const companyApplication = useForm('company/application', '')
  const date = useForm('date', '')
  const expires = useForm('expires', '')
  const description = useForm('description', '')
  const link1 = useForm('link1', '')
  const link2 = useForm('link2', '')

  const handleSubmit = event => {
    event.preventDefault()
    let article = {
      topic: topic.value,
      application: companyApplication.value,
      activeDate: date.value,
      expirationDate: expires.value,
      description: description.value,
      link1: link1.value,
      link2: link2.value
    }

    if (id) article = { ...article, id }

    saveArticle(article)
  }

  const initializeForm = article => {
    const {
      id: _id,
      topic: _topic,
      application: _application,
      description: _description,
      expirationDate: _expirationDate,
      activeDate: _activeDate,
      link1: _link1,
      link2: _link2
    } = article
    const stage = value => ({ target: { value } })

    setId(_id)
    topic.onChange(stage(_topic))
    companyApplication.onChange(stage(_application))
    date.onChange(stage(_activeDate))
    expires.onChange(stage(_expirationDate))
    description.onChange(stage(_description))
    link1.onChange(stage(_link1))
    link2.onChange(stage(_link2))
  }

  useEffect(() => {
    const id = parseInt(props.match.params.id)
    id && fetchArticle(id).then(initializeForm)
  }, [])

  return (
    <div>
      <form className="add-article-form" onSubmit={handleSubmit}>
        <h2>Create an Article</h2>
        <label>
          <div>topic</div>
          <input {...topic} required type="text" className="input" />
        </label>
        <label>
          <div>company/application</div>
          <input
            {...companyApplication}
            required
            type="text"
            className="input"
          />
        </label>
        <label>
          <div>date</div>
          <input {...date} required type="date" className="input" />
        </label>
        <label>
          <div>expires</div>
          <input {...expires} required type="date" className="input" />
        </label>
        <label>
          <div>description</div>
          <textarea {...description} required type="text" className="input" />
        </label>
        <label>
          <div>link1</div>
          <input {...link1} required type="text" className="input" />
        </label>
        <label>
          <div>link2</div>
          <input {...link2} required type="text" className="input" />
        </label>
        <div>
          <Button variant="primary">Submit Article</Button>
        </div>
      </form>
    </div>
  )
}

export default ArticlesManagement
