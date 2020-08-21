import React from 'react';

const Header = (props) => {
  const organization = props.organization;
  return (
    <div className="org-header">
      <img className="company-logo" src={organization.avatarUrl} alt={organization.name}></img>
      <div className="text">
        <div>
          <h2><strong>{organization.name}</strong></h2>
        </div>
        <div className="text-grey-light">
          {organization.description}
        </div>
      </div>
    </div>
  );
}

export default Header;