import React from 'react';
import { NavLink } from 'react-router-dom';

const GridView = (props) => {
  return (
    <div className="members-div">
      {props.mentionableUsers.map(user => (
        <div key={user.id} className="user-data-block">
          <img src={user.avatarUrl} alt="no-user" className="member-avatar"></img>
          <p>{user.name}</p>
          <NavLink to={`/${user.login}`}>{user.login}</NavLink>
        </div>
      ))}
    </div>
  );
}

export default GridView;
