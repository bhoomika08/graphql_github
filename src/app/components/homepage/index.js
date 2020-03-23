import Header from 'app/components/homepage/header';
import Organization from 'app/components/organization-info';
import React from 'react';
import UserInfo from 'app/components/user-info';
import * as Constants from 'app/constants';

const HomePage = (props) => {
  const { match: { params: { searchName, typeName } }, history } = props
  return (
    <div className="app">
      <Header
        searchName={searchName}
        typeName={typeName}
        history={history}
      />
      {typeName === Constants.ORGANIZATION_TEXT &&
        <Organization
          searchName={searchName}
        />
      }
      {typeName === Constants.USER_TEXT &&
        <UserInfo
          searchName={searchName}
        />
      }
    </div>
  );
}

export default HomePage;