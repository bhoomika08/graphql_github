import React from 'react';
import Organization from './organization';
import * as Constants from '../../constants/constants'
import { withApollo } from "react-apollo";
import { loader } from 'graphql.macro';
import Header from './header';
import UserInfo from '../user-info';

const GET_ORG_INFO = loader('../../graphql/queries/organization-info.gql');
const GET_USER_INFO = loader('../../graphql/queries/user-info.gql')

const getRepositories = (client, searchName, query) => {
  return client.query({
    query: query,
    variables: { searchName },
  });
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: '',
      filterRepos: [],
      search: null,
      errors: null,
      isOrganization: true,
      selectedLanguages: [],
    };
  }

  componentDidMount() {
    const searchType = this.props.match.params.typeName;
    const searchName = this.props.match.params.searchName;
    if (searchName) {
      if (searchType === 'Organization') {
        this.fetchDataFromGitHub(searchName, GET_ORG_INFO);
        this.setState({
          path: searchName,
          isOrganization: true,
        })
      } else if (searchType === 'User') {
        this.fetchDataFromGitHub(searchName, GET_USER_INFO);
        this.setState({
          path: searchName,
          isOrganization: false,
        })
      }
    }
  }

  onChangeHandler = event => {
    this.setState({ path: event.target.value });
  };

  onSubmitHandler = event => {
    if (this.state.isOrganization) {
      this.props.history.push(`/Organization/${this.state.path}`);
      this.fetchDataFromGitHub(this.state.path, GET_ORG_INFO);
    } else {
      this.props.history.push(`/User/${this.state.path}`);
      this.fetchDataFromGitHub(this.state.path, GET_USER_INFO);
    }
    event.preventDefault();
  };

  fetchDataFromGitHub = (path, query) => {
    this.setState({ isLoading: true })
    getRepositories(this.props.client, path, query)
      .then(queryResult => {
        const { data, loading, error } = queryResult
        if (this.state.isOrganization) {
          this.setState({
            search: data.organization,
            error: error,
            isLoading: loading
          })
        } else {
          this.setState({
            search: data.user,
            error: error,
            isLoading: loading
          })
        }
      }
      ).catch(error => this.setState({ error: error.message, isLoading: false}))
  };

  clearData = () => {
    this.setState({
      path: '',
      filterRepos: [],
      search: null,
    }, this.props.history.push(''));
  }

  filterRepos(selectedElements) {
    const filterLangArr = [];
    const repoArr = this.state.search.repositories.nodes
    if (selectedElements.length) {
      for (let i = 0; i < selectedElements.length; i++) {
        filterLangArr.push(selectedElements[i].name);
      }
      const filterRepoArr = repoArr.filter(repo => {
        let repoLangArr = [];
        repo.languages.nodes.map(lang => repoLangArr.push(lang.name));
        const found = repoLangArr.some(r => filterLangArr.includes(r))
        return found;
      });
      this.setState({
        filterRepos: filterRepoArr,
        selectedLanguages: filterLangArr,
      });
    } else {
      this.setState({
        filterRepos: repoArr,
        selectedLanguages: [],
      });
    }
  }

  setQueryType = () => {
    this.setState({
      path: '',
      search: null,
      isOrganization: !this.state.isOrganization,
    })
  }

  render() {
    const { path, search, errors, filterRepos, isOrganization, isLoading } = this.state;
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
          organization={search}
          filterRepos={(selectedElements) => this.filterRepos(selectedElements)}
          path={path}
          text={isOrganization ? headerTextForOrg : headerTextForUser}
          onChange={this.onChangeHandler}
          onSubmit={this.onSubmitHandler}
          onClick={this.clearData}
          setQueryType={this.setQueryType}
        />
        {isLoading && <div className="loader-container">
          <div className="loader"></div>
        </div>}
        {
          errors &&
          <p>{errors.message}</p>
        }
        {
          search && (
            isOrganization ? (
              <Organization
                path={path}
                organization={search}
                repositories={filterRepos.length ? filterRepos : search.repositories.nodes}
                errors={errors}
                selectedLanguages={this.state.selectedLanguages}
              />
            ) : (
                <UserInfo
                  user={search}
                  userLogin={path}
                  repositories={filterRepos.length ? filterRepos : search.repositories.nodes}
                  selectedLanguages={this.state.selectedLanguages}
                />
              )
          )
        }
      </div>
    );
  }
}

export default withApollo(HomePage);