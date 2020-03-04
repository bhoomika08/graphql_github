import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/repositories.css';
import * as Constants from '../../constants/constants';
import LockIcon from '../../../assets/images/lock-icon.png';

const Repositories = ({ path, organization, repositories, selectedLanguages }) => {
  return (
    <div className="app">
      <p>
        <strong>{Constants.REPO_COUNT_TEXT}{organization.repositories.totalCount}</strong>
      </p>
      <p>Viewed Repositories: {repositories.length}</p>
      <div className="repo">
        <ul>
          {repositories.map(repository => (
            <React.Fragment key={repository.id}>
              <li>
                <div className="mb-20">
                  <NavLink to={`/Repository/${path}/${repository.name}`}><strong>{repository.name}</strong></NavLink>
                  {
                    repository.isPrivate ? <span className="private-icon"><img src={LockIcon} alt="no-img" className="icon"></img>Private</span> : ''
                  }
                </div>
                <div className="d-flex">
                  <a className="repo-url" href={repository.url} target="_blank" rel="noopener noreferrer">{repository.url}</a>
                  <div className="languages">
                    <span className="language">
                      {
                        repository.languages.nodes.map(language => (
                          <React.Fragment key={language.id}>
                            <span className="lang-color-container" style={{ backgroundColor: language.color }}></span>
                            <span className={selectedLanguages.includes(language.name) ? "highlight" : ""}>{language.name}</span>
                          </React.Fragment>
                        ))
                      }
                    </span>
                  </div>
                </div>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Repositories;