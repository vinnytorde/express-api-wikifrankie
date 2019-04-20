import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { Grommet, Menu } from 'grommet'
import Articles from './pages/articles'
import ArticlesManagement from './pages/articles-management'
import './App.scss'

const Header = ({ history }) => {
  const routeTo = destination => () => history.push(destination)

  return (
    <div className="header">
      <h1>WikiFrankie</h1>
      <Menu
        label="Menu"
        items={[
          { label: 'Articles', onClick: routeTo('/articles') },
          { label: 'Create Article', onClick: routeTo('/articles/create') },
          { label: 'Topics', onClick: routeTo('/topics') },
          { label: 'User', onClick: routeTo('/user') },
          { label: 'Settings', onClick: routeTo('/settings') }
        ]}
      />
    </div>
  )
}
const Footer = props => (
  <div className="footer">
    POWERED BY <span className="mos">MOS</span>
  </div>
)

const determineWidth = width => {
  if (width > 0 && width < 560) {
    return 'sm'
  } else if (width > 560 && width < 1024) {
    return 'md'
  } else {
    return 'lg'
  }
}

const App = props => {
  const [layout, setLayout] = useState(determineWidth(window.innerWidth))

  useEffect(() => {
    const handleResize = event => setLayout(determineWidth(window.innerWidth))
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Grommet>
      <div className={'app ' + layout}>
        <Header history={props.history} />
        <div className="content">
          <Switch>
            <Route path="/articles" exact component={Articles} />
            <Route path="/articles/:id" component={ArticlesManagement} />
            <Route path="/" render={() => <Redirect to="/articles" />} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Grommet>
  )
}

export default withRouter(App)
