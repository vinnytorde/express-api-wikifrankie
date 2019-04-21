import React, { Fragment } from 'react'
import { Box, Button } from 'grommet'
import useArticles from '../hooks/articles'
import Table from '../components/table'
import PageHeader from '../components/page-header'
import { toPrettyDate } from '../utils/utils'

const deleteArticle = id => {
  const endpoint = [
    `/api/articles/${id}`,
    {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  ]
  return fetch(...endpoint).then(r => r.json())
}

const Articles = props => {
  const appendButtons = row => {
    const navigateToArticle = () =>
      props.history.push(`${props.location.pathname}/${row.id}`)

    row.actions = (
      <Fragment>
        <Button
          onClick={navigateToArticle}
          fill
          color="neutral-3"
          label="Modify"
          margin="xsmall"
        />
        <Button
          onClick={() => deleteArticle(row.id)}
          fill
          color="status-error"
          label="Delete"
          margin="xsmall"
        />
      </Fragment>
    )
    return row
  }

  const articles = useArticles()
  let data = articles
  if (data.length) {
    data = articles.map(appendButtons)
  }

  return (
    <Box>
      <PageHeader>All Entries</PageHeader>

      <Table
        data={data}
        columnConfig={[
          { label: 'Topic', key: 'topic' },
          { label: 'Company/Application', key: 'application' },
          { label: 'Active Date', key: 'activeDate', modifier: toPrettyDate },
          { label: 'Description', key: 'description' },
          { label: 'Link 1', key: 'link1' },
          { label: 'Link 2', key: 'link2' },
          { label: 'Actions', key: 'actions' }
        ]}
      />
    </Box>
  )
}

export default Articles
