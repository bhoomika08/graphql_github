import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RepositoryInfo from '../components/repository-info/index';
import HomePage from '../components/organization-info/index';
import UserInfo from '../components/user-info/index';


const RoutesComponent = () => (
  <Switch>
    <Route path="/:userLogin" exact component={UserInfo}></Route>
    <Route path="/Repository/:orgname/:reponame" exact component={RepositoryInfo}></Route>
    <Route path="/:typeName/:searchName" component={HomePage}></Route>
    <Route path="/" component={HomePage}></Route>
  </Switch>
)

export default RoutesComponent;