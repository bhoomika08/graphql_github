import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RepositoryInfo from 'app/components/repository-info/index';
import HomePage from 'app/components/organization-info/index';
import UserInfo from 'app/components/user-info/index';

const RoutesComponent = () => (
  <Switch>
    <Route path="/:userLogin" exact component={UserInfo}></Route>
    <Route path="/repository/:owner/:repoName" exact component={RepositoryInfo}></Route>
    <Route path="/:typeName/:searchName" component={HomePage}></Route>
    <Route path="/" component={HomePage}></Route>
  </Switch>
)

export default RoutesComponent;