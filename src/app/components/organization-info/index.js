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
        {typeName === Constants.USER_TEXT &&
          <UserInfo
            searchName={this.props.match.params.searchName}
          />
        }
      </div>
    );
  }
}

const ORG_USER_DATA = graphql(GET_ORG_INFO, {
    skip: (props) => {
      if (props.match.params.typeName) {
        if (props.match.params.typeName !== Constants.ORGANIZATION_TEXT) {
          return true;
        }
      }
      else {
        return true;
      }
    },
    options: (props) => ({
      variables: { searchName: props.match.params.searchName },
      fetchPolicy: "cache-and-network",
    }),
  })(HomePage)

export default ORG_USER_DATA;