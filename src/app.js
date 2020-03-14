import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'app/styles/app.css';

import RoutesComponent from './app/route';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <RoutesComponent />
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
