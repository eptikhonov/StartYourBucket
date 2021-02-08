import * as React from 'react'
import { useLocation, Route, Switch } from 'react-router-dom'

import routes from '../routes/routes.js'
import { Header, Footer } from '../components'
function MainLayout() {
  const location = useLocation()
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === '/') {
        return (
          <Route
            path={prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        )
      } else {
        return null
      }
    })
  }

  React.useEffect(() => {
    // update component or styling upon location change
  }, [location])

  return (
    <>
      <div>
        <Header />
        <Switch>{getRoutes(routes)}</Switch>
        <Footer />
      </div>
    </>
  )
}

export default MainLayout
