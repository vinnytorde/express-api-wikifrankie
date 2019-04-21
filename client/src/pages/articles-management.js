import React, { useState, useEffect, Fragment } from 'react'
import {
  Box,
  Button,
  Calendar,
  CheckBox,
  Form,
  FormField,
  Text,
  TextArea,
  TextInput
} from 'grommet'
import PageHeader from '../components/page-header'
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
    value: new Date().toISOString(),
    required: true
  })
  date.onSelect = date.onChange
  date.date = date.value

  const expires = useForm({
    name: 'expires',
    type: 'date',
    value: ''
  })
  expires.onSelect = expires.onChange
  expires.date = expires.value

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
    date.onChange(_activeDate)
    expires.onChange(_expirationDate)
    description.onChange(stage(_description))
    link1.onChange(stage(_link1))
    link2.onChange(stage(_link2))
  }

  const isNewPost = props.match.params.id === 'create'

  useEffect(() => {
    const id = props.match.params.id
    if (isNewPost) {
      resetForm()
    } else {
      fetchArticle(id).then(initializeForm)
    }
  }, [props.match.params.id])

  return (
    <Fragment>
      <PageHeader>{isNewPost ? 'Create' : 'Edit'} an Article</PageHeader>
      <Form onSubmit={handleSubmit}>
        <Box
          margin="auto"
          width="xlarge"
          animation={{
            type: 'fadeIn',
            delay: 200,
            duration: 750,
            size: 'small'
          }}
        >
          <Box direction="row" margin={{ vertical: 'large' }} justify="between">
            <Box gap="small">
              <FormField
                size="large"
                label="Topic"
                component={TextInput}
                {...topic}
              />
              <FormField
                size="large"
                label="Company/Application"
                component={TextInput}
                {...companyApplication}
              />
            </Box>
            <Box align="center">
              <Text margin="large">Date</Text>
              <Calendar size="small" {...date} />
            </Box>
            <Box align="center">
              <Text margin="large">Expires</Text>
              <Calendar size="small" {...expires} />
            </Box>
          </Box>
          <Box height="medium">
            <Text>Description</Text>
            <TextArea fill resize={false} {...description} />
          </Box>
          <Box direction="row" gap="small" margin={{ vertical: 'medium' }}>
            <FormField
              size="large"
              label="Link 2"
              component={TextInput}
              {...link2}
            />
            <FormField
              size="large"
              label="Link 1"
              component={TextInput}
              {...link1}
            />
          </Box>
          <Box direction="row" margin="small" gap="small" justify="end">
            {isNewPost && (
              <CheckBox label="Create Another?" {...createAnother} />
            )}
            <Button
              primary
              label="Submit Article"
              type="submit"
              margin={{ vertical: 'medium' }}
            />
          </Box>
        </Box>
      </Form>
    </Fragment>
  )
}

export default ArticlesManagement
