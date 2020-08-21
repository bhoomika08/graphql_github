import React from 'react';
import { graphql } from "react-apollo";
import { loader } from 'graphql.macro';
import { ViewerContext } from 'app/contexts/ViewerContext.js';
import Footer from 'app/sharedComponents/footer.js';
import Header from 'app/components/user-info/header';
import Repositories from 'app/components/repositories';
import 'app/styles/user-info.css';

const GET_USER_INFO = loader('app/graphql/queries/user-info.gql')

const UserInfo = (props) => {
  const { loading, error, user } = props.data;
  return (
    <>
      {loading &&
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      }
      {error && <p>{error.message}</p>}
      {user && !error &&
        <>
          <Header user={user} />
          {user.repositories.nodes.length > 0 &&
            <Repositories
              fetchedData={user}
              path={user.login}
            />
          }
          <ViewerContext.Consumer>
            {(viewerDetails) => (
              <Footer {...viewerDetails} />
            )}
          </ViewerContext.Consumer>
        </>
      }
    </>
  );
}

const USER_INFO = graphql(GET_USER_INFO, {
  options: (props) => ({
    variables: {
      searchName: props.searchName || props.match.params.userLogin,
    },
    fetchPolicy: "cache-and-network",
  }),
})(UserInfo)

export default USER_INFO;