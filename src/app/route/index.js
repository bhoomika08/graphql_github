import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RepositoryInfo from 'app/components/repository-info';
import HomePage from 'app/components/homepage';
import UserInfo from 'app/components/user-info';

const RoutesComponent = () => (
  <Switch>
    <Route path="/:userLogin" exact component={UserInfo}></Route>
    <Route path="/repository/:owner/:repoName" exact component={RepositoryInfo}></Route>
    <Route path="/:typeName/:searchName" component={HomePage}></Route>
    <Route path="/" component={HomePage}></Route>
  </Switch>
)

export default RoutesComponent;