import React from 'react';

const Footer = (props) => {
  const { avatarUrl, name, login } = props;
  return (
    <>
      {props && <div className="footer">
        <div className="ml-30">
          <h3>Viewer Details</h3>
          <div className="user-details-div margin-left">
            <img src={avatarUrl} alt="no-user" className="member-avatar"></img>
            <div>
              <h3>{name}</h3>
              <p>{login}</p>
            </div>
          </div>
        </div>
      </div>
      }
    </>
  );
}
export default Footer;