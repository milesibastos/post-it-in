import React from 'react';
import { Switch, Route } from 'react-router-dom';
import compose from 'recompose/compose';
import branch from 'recompose/branch';
import renderComponent from 'recompose/renderComponent';
import withAuthentication from 'core/withAuthentication';

const LinkedIn = React.lazy(() => import('./auth/linkedin'));
const Authentication = React.lazy(() => import('./auth/authentication'));
const Main = React.lazy(() => import('./scaffold'));

function PublicRoutes() {
  return (
    <Switch>
      <Route path="/auth/linkedin">
        <LinkedIn />
      </Route>
      <Route>
        <Authentication />
      </Route>
    </Switch>
  );
}

function PrivateRoutes() {
  return (
    <Switch>
      <Route>
        <Main />
      </Route>
    </Switch>
  );
}

export default compose(
  withAuthentication,
  branch(({ user }: { user: any }) => !user, renderComponent(PublicRoutes))
)(PrivateRoutes);
