import React from 'react';
import { TITLE } from 'app/constants'
import 'app/styles/header.css';

const Header = (props) => {
    return (
      <div className="app">
        <h1>{TITLE}</h1>
        <div>
          <div className="query-type-button" onClick={props.setQueryType}>{props.text.buttonText}</div>
        </div>
        <div>
          <label htmlFor="url">
            {props.text.heading}
          </label>
        </div>
        <div className="form">
            <input
              id="url"
              type="text"
              className="search-box"
              value={props.path}
              onChange={props.onChange}
              placeholder={props.text.searchPlaceholder}
            />
            <div>
              <button onClick={props.onSubmit}>Search</button>
              <button className="ml-10" onClick={props.onClick}>Clear</button>
            </div>
        </div>
        <hr />
      </div >
    );
}

export default Header;