import React, { Suspense } from 'react'
import {
  Redirect,
  Switch
} from 'react-router-dom'
import { Container, Fade } from 'reactstrap'

// routes config
import routes from '../../navigation/Routes'
import { PrivateRoute } from '../../navigation/RouteTypes'
import TheNavigation from './TheNavigation'
  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheLayout = () => {
  return (
    <>
    <TheNavigation />
    
    <Container fluid>
      <Suspense fallback={loading}>
        <Switch>
          {routes.map((route, idx) => {
            return route.component && (
              <PrivateRoute
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                component={props => (
                  <Fade>
                    <route.component {...props} />
                  </Fade>
                )} />
            )
          })}
          <Redirect from="/" to="/dashboard" />
        </Switch>
      </Suspense>
    </Container>
    </>
  )
}

export default TheLayout
