import React, { useState, useEffect } from 'react'
// import Searchbar from '../components/searchbar'
import Table from '../components/table'
import { toPrettyDate } from '../utils/utils'

const Articles = props => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('/api/articles')
      .then(r => r.json())
      .then(setData)
  }, [])

  return (
    <div>
      <h2>Articles</h2>
      {/* <Searchbar /> */}
      <Table
        data={data}
        hightlightOnHover
        columnConfig={[
          { label: 'Topic', key: 'topic' },
          { label: 'Company/Application', key: 'application' },
          { label: 'Active Date', key: 'activeDate', modifier: toPrettyDate },
          { label: 'Description', key: 'description' },
          { label: 'Link 1', key: 'link1' },
          { label: 'Link 2', key: 'link2' }
        ]}
      />
    </div>
  )
}

export default Articles