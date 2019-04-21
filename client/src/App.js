import React from 'react'
import { Link, Route, Redirect, Switch, withRouter } from 'react-router-dom'
import { Box, Grommet, Menu, Text } from 'grommet'
import {
  AddCircle,
  Gremlin,
  Inspect,
  Menu as MenuIcon,
  SettingsOption,
  UserSettings,
  VirtualMachine
} from 'grommet-icons'
import Articles from './pages/articles'
import ArticlesManagement from './pages/articles-management'
import './App.scss'

const Header = ({ history }) => {
  const routeTo = destination => () => history.push(destination)
  return (
    <Box
      direction="row"
      background="brand"
      justify="between"
      animation="slideDown"
    >
      <Link className="no-underline" to="/">
        <Box direction="row" align="center">
          <Gremlin size="large" />
          <Text
            color="light-1"
            margin={{ vertical: '0', horizontal: 'small' }}
            size="medium"
            weight="bold"
          >
            Wiki
            <br />
            Frankie
          </Text>
        </Box>
      </Link>
      <Menu
        icon={<MenuIcon />}
        label="Menu"
        items={[
          {
            label: 'Articles',
            onClick: routeTo('/articles'),
            icon: (
              <Box margin={{ horizontal: 'xsmall' }}>
                <Inspect />
              </Box>
            )
          },
          {
            label: 'Create Article',
            onClick: routeTo('/articles/create'),
            icon: (
              <Box margin={{ horizontal: 'xsmall' }}>
                <AddCircle />
              </Box>
            )
          },
          {
            label: 'Topics',
            onClick: routeTo('/topics'),
            icon: (
              <Box margin={{ horizontal: 'xsmall' }}>
                <VirtualMachine />
              </Box>
            )
          },
          {
            label: 'User',
            onClick: routeTo('/user'),
            icon: (
              <Box margin={{ horizontal: 'xsmall' }}>
                <UserSettings />
              </Box>
            )
          },
          {
            label: 'Settings',
            onClick: routeTo('/settings'),
            icon: (
              <Box margin={{ horizontal: 'xsmall' }}>
                <SettingsOption />
              </Box>
            )
          }
        ]}
      />
    </Box>
  )
}

const Footer = props => (
  <Box
    direction="row"
    background="brand"
    pad="small"
    justify="between"
    animation="slideUp"
  >
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
