import React from 'react';
import { Switch, Route } from 'react-router-dom';

const LinkedIn = React.lazy(() => import('./auth/linkedin'));
const Authentication = React.lazy(() => import('./auth/authentication'));

export default function App() {
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
