import React from 'react';
import { NavLink } from 'react-router-dom';

const ListView = (props) => {
  return (
    <>
      <table className="list-view mb-20">
        <tbody>
          {props.members.map(user => (
            <tr key={user.id} className="listElement">
              <td><img src={user.avatarUrl} alt="no-user" className="member-avatar"></img></td>
              <td>{user.name}</td>
              <td><NavLink to={`/${user.login}`}>{user.login}</NavLink></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ListView;