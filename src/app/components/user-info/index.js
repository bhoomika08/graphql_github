import React from 'react';
import { withApollo } from "react-apollo";
import { loader } from 'graphql.macro';
import PageHeader from './page-header';
import Repositories from '../organization-info/repositories'

const GET_USER_INFO = loader('../../graphql/queries/user-info.gql')

const getRepositories = (client, searchName) => {
  return client.query({
    query: GET_USER_INFO,
    variables: { searchName },
  });
};

// const resolveRepositoryQuery = queryResult => () => ({
//   user: queryResult.data.user,
//   errors: queryResult.data.errors,
// });

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      error: null,
    }
  }

  componentDidMount() {
    let userLogin;
    if (this.props.userLogin) {
      userLogin = this.props.userLogin;
    } else {
      userLogin = this.props.match.params.userLogin;
    }
    const client = this.props.client;
    this.setState({ isLoading: true });
    getRepositories(client, userLogin)
      .then(queryResult => {
        const { data, loading, error } = queryResult
        this.setState({
          user: data.user,
          error: error,
          isLoading: loading
        })
      })
      .catch(error => console.log(error.message))
  }

  render() {
    const { user, error, isLoading } = this.state;
    return (
      <>
      { isLoading && <div className="loader-container">
          <div className="loader"></div>
        </div> }
      { error && <p>{error.message}</p> }  
        {
          user &&
            <>
              <PageHeader user={user} />
              <Repositories
                path={user.login}
                organization={user}
                repositories={this.props.repositories ? this.props.repositories : user.repositories.nodes}
                selectedLanguages={this.props.selectedLanguages ? this.props.selectedLanguages : ''}
              />
            </>
        }
      </>
    );
  }
}

export default withApollo(UserInfo);