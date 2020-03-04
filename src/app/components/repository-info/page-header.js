import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/repository-info.css';

const PageHeader = (props) => {
  const { owner: {__typename, login}, name, description, primaryLanguage } = props.repository;
  return (
    <div className="pagehead">
      <div className="repo-path width-fit">
        <h3>
          <span><NavLink to={`/${__typename}/${login}`}>{login}</NavLink></span>
          <span className="path-divider">/</span>
          <strong>{name}</strong>
        </h3>
      </div>
      {description}
      {
        primaryLanguage ? (
          <div className="language">
              <strong>Primary Language: </strong>
              <span className="lang-color-container" style={{ backgroundColor: primaryLanguage.color }}></span>
              <span>{primaryLanguage.name}</span>
          </div>
        ) : ''
      }
    </div>
  );
}

export default PageHeader;