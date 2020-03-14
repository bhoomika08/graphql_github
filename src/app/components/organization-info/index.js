import Header from 'app/components/organization-info/header';
import { loader } from 'graphql.macro';
import Organization from 'app/components/organization-info/organization.js';
import React from 'react';
import UserInfo from 'app/components/user-info';
import { graphql } from "react-apollo";
import * as Constants from 'app/constants';

const GET_ORG_INFO = loader('app/graphql/queries/organization-info.gql');

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: props.match.params.searchName || '' ,
      isOrganization: props.match.params.typeName === 'user' ? false : true,
    };
  }

  onChangeHandler = event => {
    this.setState({ searchValue: event.target.value });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    if (this.state.isOrganization) {
      this.props.history.push(`/organization/${this.state.searchValue}`);
    } else {
      this.props.history.push(`/user/${this.state.searchValue}`);
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
    if (this.props.data) {
      var { variables: { searchName }, organization, loading, error } = this.props.data
    }
    let headerTextForUser = {
      heading: Constants.SHOW_USER_REPO_TEXT,
      buttonText: Constants.ORG_SEARCH_BUTTON,
      searchPlaceholder: Constants.USER_SEARCH_PLACEHOLDER,
    }

    let headerTextForOrg = {
      heading: Constants.SHOW_ORG_REPO_TEXT,
      buttonText: Constants.USER_SEARCH_BUTTON,
      searchPlaceholder: Constants.ORG_SEARCH_PLACEHOLDER,
    }

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
        {loading &&
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        }
        {error &&
          <p>{error.message}</p>
        }
        {organization &&
          <Organization
            fetchedData={organization}
            path={searchName}
            error={error}
          />
        }
        {this.props.match.params.typeName === 'user' &&
          <UserInfo
            searchName={this.props.match.params.searchName}
          />
        }
      </div>
    );
  }
}

function skipQuery(props, typeName) {
  if (props.match.params.typeName) {
    if (props.match.params.typeName === typeName) {
      return false;
    } else {
      return true;
    }
  }
  else {
    return true;
  }
}

const ORG_USER_DATA = graphql(GET_ORG_INFO, {
    skip: (props) => {
      return skipQuery(props, 'organization');
    },
    options: (props) => ({
      variables: { searchName: props.match.params.searchName },
      fetchPolicy: "cache-and-network",
    }),
  })(HomePage)

export default ORG_USER_DATA;