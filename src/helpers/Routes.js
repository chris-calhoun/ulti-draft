import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../views/Home';
import ActiveDraft from '../views/Draft/ActiveDraft';
import CreateDraft from '../views/Draft/CreateDraft';
import InputCaptainNames from '../views/Draft/InputCaptainNames';
import Leagues from '../views/Leagues';
import Teams from '../views/Teams';
import NotFound from '../views/NotFound';
import Players from '../views/Players';

export default function Routes({ authed }) {
  return (
    <Switch>
      <Route
        exact path='/'
        component={() => <Home authed={authed}/>}
      />
      <Route
        exact path='/active-draft/:id'
        component={(props) => <ActiveDraft {...props} />}
      />
      <Route
        exact path='/create-draft'
        component={() => <CreateDraft authed={authed}/>}
      />
      <Route
        exact path='/captains'
        component={(props) => <InputCaptainNames {...props}/>}
      />
      <Route
        exact path='/leagues'
        component={() => <Leagues authed={authed}/>}
      />
      <Route
        exact path='/teams/:id'
        component={(props) => <Teams authed={authed} {...props}/>}
      />
      <Route
        exact path='/players/:id'
        component={(props) => <Players authed={authed} {...props}/>}
      />
      <Route component={NotFound} />
    </Switch>
  );
}
