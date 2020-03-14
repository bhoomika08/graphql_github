import React from 'react';
import Repositories from 'app/components/organization-info/repositories';
import 'app/styles/organization.css';

const Organization = ({ path, fetchedData }) => {
  return (
    <div className="app">
      <div className="org-header">
        <img className="company-logo" src={fetchedData.avatarUrl} alt={fetchedData.name}></img>
        <div className="text">
          <div>
            <h2><strong>{fetchedData.name}</strong></h2>
          </div>
          <div className="text-grey-light">
            {fetchedData.description}
          </div>
        </div>
      </div>
      {
        fetchedData.repositories.nodes.length ? <Repositories fetchedData={fetchedData} path={path} /> : ''
      }
    </div>
  )
}

export default Organization;