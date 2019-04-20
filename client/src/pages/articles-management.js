import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Button } from 'grommet'
import useForm from '../hooks/form'
import { useSnackbar } from 'notistack'

const fetchArticle = id => {
  const endpoint = [
    `/api/articles/${id}`,
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
    '/api/articles',
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
  const topic = useForm({ name: 'topic', value: '', required: true })
  const companyApplication = useForm({
    name: 'company/application',
    value: '',
    required: true
  })
  const date = useForm({
    name: 'date',
    type: 'date',
    value: new Date(),
    modifier: date => moment(date).format('YYYY-MM-DD'),
    required: true
  })
  const expires = useForm({
    name: 'expires',
    type: 'date',
    value: '',
    modifier: date => moment(date).format('YYYY-MM-DD')
  })
  const description = useForm({
    name: 'description',
    value: ''
  })
  const link2 = useForm({ name: 'link2', value: '' })
  const link1 = useForm({ name: 'link1', value: '' })
  const createAnother = useForm({ name: 'createAnother', type: 'checkbox' })
  const { enqueueSnackbar } = useSnackbar()

  const resetForm = () => {
    const resetField = field => {
      field.reset()
    }
    ;[
      topic,
      companyApplication,
      date,
      expires,
      description,
      link1,
      link2
    ].forEach(resetField)
    setId(null)
  }

  const handleRouting = () => {
    let message
    if (createAnother.checked) {
      props.history.push('/articles/create')
      resetForm()
      message = 'Created Successfully!'
    } else {
      props.history.push('/articles')
      message = 'Success!'
    }
    enqueueSnackbar(message)
  }

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

    saveArticle(article).then(handleRouting)
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

  const isNewPost = props.match.params.id === 'create'

  useEffect(() => {
    const id = props.match.params.id
    !isNewPost && fetchArticle(id).then(initializeForm)
  }, [])

  return (
    <div>
      <form className="add-article-form" onSubmit={handleSubmit}>
        <h2>{isNewPost ? 'Create' : 'Edit'} an Article</h2>
        <label>
          <div>topic</div>
          <input {...topic} />
        </label>
        <label>
          <div>company/application</div>
          <input {...companyApplication} />
        </label>
        <label>
          <div>date</div>
          <input {...date} />
        </label>
        <label>
          <div>expired</div>
          <input {...expires} />
        </label>
        <label>
          <div>description</div>
          <textarea {...description} />
        </label>
        <label>
          <div>link1</div>
          <input {...link1} />
        </label>
        <label>
          <div>link2</div>
          <input {...link2} />
        </label>
        <div>
          {isNewPost && (
            <label>
              <div className="flex">
                <span>Create another</span>
                <input {...createAnother} />
              </div>
            </label>
          )}
          <Button primary label="Submit Article" type="submit" />
        </div>
      </form>
    </div>
  )
}

export default ArticlesManagement
