import React, { Component } from 'react';
import { graphql } from "react-apollo";
import { loader } from 'graphql.macro';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from 'app/components/ErrorBoundary'
import { ViewerContext } from 'app/contexts/ViewerContext.js';
import 'app/styles/app.css';
import RoutesComponent from 'app/route';

const VIEWER_INFO = loader('app/graphql/queries/viewer.gql');

class App extends Component {
  render() {
    const { loading, viewer } = this.props.data;
    return (
      <div>
        {loading &&
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        }
        {viewer && <ErrorBoundary>
          <ViewerContext.Provider value={{ avatarUrl: viewer.avatarUrl, name: viewer.name, login: viewer.login }}>
            <BrowserRouter>
              <RoutesComponent />
            </BrowserRouter>
          </ViewerContext.Provider>
        </ErrorBoundary>
        }
      </div>
    )
  }
}

const VIEWER = graphql(VIEWER_INFO, {
  options: () => ({
    fetchPolicy: "cache-and-network",
  }),
})(App)

export default VIEWER;
