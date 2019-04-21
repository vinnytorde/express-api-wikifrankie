import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { Grommet, Menu, Box, Heading, Text } from 'grommet'
import Articles from './pages/articles'
import ArticlesManagement from './pages/articles-management'
import './App.scss'

const Header = ({ history }) => {
  const routeTo = destination => () => history.push(destination)
  return (
    <Box direction="row" background="brand" justify="between">
      <Text
        margin={{ vertical: '0', horizontal: 'small' }}
        size="medium"
        weight="bold"
      >
        Wiki
        <br />
        Frankie
      </Text>
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
    </Box>
  )
}

const Footer = props => (
  <Box direction="row" background="brand" pad="small" justify="between">
    <Text>POWERED BY MOS</Text>
  </Box>
)

const App = props => {
  return (
    <Grommet>
      <Box>
        <Box justify="center">
          <Header history={props.history} />
        </Box>
        <Box>
          <Switch>
            <Route path="/articles" exact component={Articles} />
            <Route path="/articles/:id" component={ArticlesManagement} />
            <Route path="/" render={() => <Redirect to="/articles" />} />
          </Switch>
        </Box>
        <Footer />
      </Box>
    </Grommet>
  )
}

export default withRouter(App)
