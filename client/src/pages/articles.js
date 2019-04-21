import React, { Fragment } from 'react'
import { Heading, Button } from 'grommet'
import useArticles from '../hooks/useArticles'
import Table from '../components/table'
import { toPrettyDate } from '../utils/utils'

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
          onClick={navigateToArticle}
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
    <div>
      <Heading margin="none" level={2}>
        All Entries
      </Heading>

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
    </div>
  )
}

export default Articles
