import React from 'react';
import Header from 'app/components/homepage/header';
import Organization from 'app/components/organization-info';
import UserInfo from 'app/components/user-info';
import * as Constants from 'app/constants';

class HomePage extends React.Component {
  render() {
    const { match: { params: { searchName, typeName } }, history } = this.props
    return (
      <div>
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
}

export default HomePage;