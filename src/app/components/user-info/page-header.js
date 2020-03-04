import React from 'react';
import '../../styles/user-info.css';

const PageHeader = (props) => {
  const user = props.user;
  return (
    <>
      <div className="header">
        <div className="user-details-div margin-left">
          <img className="user-avatar" src={user.avatarUrl} alt={user.name}></img>
          <div>
            <h3>{user.name}</h3>
            <p className="text-grey-light">{user.login}</p>
          </div>
        </div>
        <div className="user-info">
          <p>{user.company}</p>
          <p>{user.location}</p>
          <a href={user.websiteUrl}>{user.websiteUrl}</a>
        </div>
      </div>
      <hr />
    </>
  );
}

export default PageHeader;