import React from 'react';
import { withApollo } from "react-apollo";
import { loader } from 'graphql.macro';
import PageHeader from './page-header';
import PageActions from './page-actions';
import RepoMembers from './repo-members';

const GET_REPOSITORIES_INFO = loader('../../graphql/queries/repositories-info.gql')

const getRepositories = (client, repository, owner) => {
  return client.query({
    query: GET_REPOSITORIES_INFO,
    variables: { repository, owner },
  });
};

class RepositoryInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repository: null,
      error: null,
    }
  }
  componentDidMount() {
    const repoName = this.props.match.params.reponame;
    const orgName = this.props.match.params.orgname;
    const client = this.props.client;
    this.setState({ isLoading: true})
    getRepositories(client, repoName, orgName)
      .then(queryResult => {
        const { data, loading, error } = queryResult
        this.setState({
          repository: data.repository,
          error: error,
          isLoading: loading
        })
      })
      .catch(error => this.setState({ error: error, isLoading: false}))
  }

  render() {
    const { repository, isLoading, error } = this.state;
    return (
      <>
        {isLoading && <div className="loader-container">
          <div className="loader"></div>
        </div>}
        {error &&
          <p>{error.message}</p>}
        {
          repository &&
          <>
            <PageHeader repository={repository} />
            <PageActions repository={repository} client={this.props.client} />
            <RepoMembers repository={repository} />
          </>
        }
      </>
    )
  }
}

export default withApollo(RepositoryInfo);