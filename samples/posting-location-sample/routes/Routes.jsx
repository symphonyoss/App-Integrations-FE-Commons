/* eslint-disable no-unused-vars */
import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import CustomCreate from '../components/CustomCreate';
import CustomInstanceCreated from '../components/CustomInstanceCreated';
import ChooseStreamType from '../components/ChooseStreamType';
import InstanceList from '../components/InstanceList';

const Routes = () => (
  <Router history={hashHistory}>
    <Route path='/' component={InstanceList} />
    <Route path='/custom-create' component={CustomCreate} />
    <Route path='/choose-stream-type' component={ChooseStreamType} />
    <Route path='/instance-created' component={CustomInstanceCreated} />
  </Router>
);

export default Routes;
