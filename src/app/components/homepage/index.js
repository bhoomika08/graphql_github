import Header from 'app/components/homepage/header';
import Organization from 'app/components/organization-info';
import React from 'react';
import UserInfo from 'app/components/user-info';
import * as Constants from 'app/constants';

const headerTextForUser = {
  heading: Constants.SHOW_USER_REPO_TEXT,
  buttonText: Constants.ORG_SEARCH_BUTTON,
  searchPlaceholder: Constants.USER_SEARCH_PLACEHOLDER,
}

const headerTextForOrg = {
  heading: Constants.SHOW_ORG_REPO_TEXT,
  buttonText: Constants.USER_SEARCH_BUTTON,
  searchPlaceholder: Constants.ORG_SEARCH_PLACEHOLDER,
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    const { searchName, typeName } = props.match.params;
    this.state = {
      searchValue: searchName || '' ,
      isOrganization: typeName === Constants.USER_TEXT ? false : true,
    };
  }

  onChangeHandler = event => {
    this.setState({ searchValue: event.target.value });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    if (this.state.isOrganization) {
      this.props.history.push(`/${Constants.ORGANIZATION_TEXT}/${this.state.searchValue}`);
    } else {
      this.props.history.push(`/${Constants.USER_TEXT}/${this.state.searchValue}`);
    }
  };

  clearData = () => {
    this.setState({
      searchValue: '',
    }, this.props.history.push(''));
  }

  setQueryType = () => {
    this.setState({
      searchValue: '',
      isOrganization: !this.state.isOrganization,
    }, this.props.history.push(''))
  }

  render() {
    const { isOrganization, searchValue } = this.state;
    const { typeName } = this.props.match.params;

    return (
      <div className="app">
        <Header
          path={searchValue}
          text={isOrganization ? headerTextForOrg : headerTextForUser}
          onChange={this.onChangeHandler}
          onSubmit={this.onSubmitHandler}
          onClick={this.clearData}
          setQueryType={this.setQueryType}
        />
        {typeName === Constants.ORGANIZATION_TEXT &&
          <Organization
            searchName={this.props.match.params.searchName}
          />
        }
        {typeName === Constants.USER_TEXT &&
          <UserInfo
            searchName={this.props.match.params.searchName}
          />
        }
      </div>
    );
  }
}

export default HomePage;