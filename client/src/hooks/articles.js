import { useState, useEffect } from 'react'

const useArticles = id => {
  let endpoint = '/api/articles'
  let initial = []
  if (id) {
    endpoint += `/${id}`
    initial = {}
  }

  const [data, setData] = useState(initial)

  useEffect(() => {
    fetch(endpoint)
      .then(r => r.json())
      .then(setData)
  }, [])

  return { articles: data, setAricles: setData }
}

export default useArticles
