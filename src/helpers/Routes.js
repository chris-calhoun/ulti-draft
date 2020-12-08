import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../views/Home';
import ActiveDraft from '../views/Draft/ActiveDraft';
import CreateDraft from '../views/Draft/CreateDraft';
import InputCaptainNames from '../views/Draft/InputCaptainNames';
import Leagues from '../views/Leagues';
import Teams from '../views/Teams';
import NotFound from '../views/NotFound';

export default function Routes({ authed }) {
  return (
    <Switch>
      <Route
        exact path='/'
        component={() => <Home authed={authed}/>}
      />
      <Route
        exact path='/active-draft'
        component={() => <ActiveDraft />}
      />
      <Route
        exact path='/create-draft'
        component={() => <CreateDraft />}
      />
      <Route
        exact path='/captains'
        component={() => <InputCaptainNames />}
      />
      <Route
        exact path='/leagues'
        component={() => <Leagues authed={authed}/>}
      />
      <Route
        exact path='/teams'
        component={() => <Teams authed={authed}/>}
      />
      <Route component={NotFound} />
    </Switch>
  );
}
