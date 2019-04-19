import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Grommet } from 'grommet'
import Login from './pages/login'
import Articles from './pages/articles'
import ArticlesManagement from './pages/articles-management'
import './App.scss'

const Header = props => (
  <div className="header">
    <h1>WikiFrankie</h1>
    {/* {isLoggedIn ? <Avatar/> : <Button color="inherit">Login</Button>}  */}
  </div>
)
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
        <Header />
        <div className="content">
          <Switch>
            <Route path="/articles" exact component={Articles} />
            <Route path="/articles/:id" component={ArticlesManagement} />
            <Route path="/" component={Login} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Grommet>
  )
}

export default App
