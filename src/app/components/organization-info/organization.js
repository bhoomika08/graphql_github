import React from 'react';
import Repositories from './repositories';
import '../../styles/organization.css';

const Organization = ({ path, organization, repositories, selectedLanguages }) => {
  return (
    <div className="app">
      <img className="company-logo" src={organization.avatarUrl} alt={organization.name}></img>
      <div className="text">
        <div>
          <h2><strong>{organization.name}</strong></h2>
        </div>
        <div className="text-grey-light">
          {organization.description}
        </div>
      </div> 
      {
        repositories.length ? <Repositories path={path} organization={organization} repositories={repositories} selectedLanguages={selectedLanguages}/> : ''
      }
    </div>
  )
}

export default Organization;