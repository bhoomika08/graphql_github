import { loader } from 'graphql.macro';
import PageActions from 'app/components/repository-info/page-actions';
import PageHeader from 'app/components/repository-info/page-header';
import React from 'react';
import RepoMembers from 'app/components/repository-info/repo-members';
import { graphql } from "react-apollo";
import 'app/styles/repository-info.css';

const GET_REPOSITORIES_INFO = loader('app/graphql/queries/repositories-info.gql')

class RepositoryInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repository: null,
      error: null,
    }
  }

  render() {
    const { loading, error, repository} = this.props.data;
    return (
      <>
        {loading &&
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        }
        {error &&
          <p>{error.message}</p>
        }
        {
          repository &&
          <>
            <PageHeader repository={repository} />
            <PageActions repository={repository} />
            <RepoMembers repository={repository} />
          </>
        }
      </>
    )
  }
}

const REPO_INFO = graphql(GET_REPOSITORIES_INFO, {
  options: (props) => ({
    variables: {
      repository: props.match.params.repoName,
      owner: props.match.params.owner
    },
    fetchPolicy: "cache-and-network",
  }),
})(RepositoryInfo);

export default REPO_INFO;