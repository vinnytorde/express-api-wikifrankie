import React, { Fragment, useState, useEffect } from 'react'
import { Heading, Button } from 'grommet'
import Table from '../components/table'
import { toPrettyDate } from '../utils/utils'

const Articles = props => {
  const [data, setData] = useState([])

  const appendButtons = data =>
    data.map(row => {
      const navigateToArticle = () =>
        props.history.push(`${props.location.pathname}/${row.id}`)

      row.actions = (
        <Fragment>
          <Button
            onClick={navigateToArticle}
            fill
            color="neutral-3"
            label="Modify"
          />
          <Button
            onClick={navigateToArticle}
            fill
            color="status-error"
            label="Delete"
          />
        </Fragment>
      )
      return row
    })

  useEffect(() => {
    fetch('/api/articles')
      .then(r => r.json())
      .then(appendButtons)
      .then(setData)
  }, [])

  return (
    <div>
      <Heading margin="none" level={2}>
        All Entries
      </Heading>
      {/* <Searchbar /> */}
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
