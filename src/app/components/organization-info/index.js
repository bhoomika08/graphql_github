import React from 'react';
import { graphql } from "react-apollo";
import { loader } from 'graphql.macro';
import { ViewerContext } from 'app/contexts/ViewerContext.js';
import Footer from 'app/sharedComponents/footer.js';
import Header from 'app/components/organization-info/header';
import Repositories from 'app/components/repositories';
import 'app/styles/organization.css';

const GET_ORG_INFO = loader('app/graphql/queries/organization-info.gql');

const Organization = (props) => {
  const { loading, error, organization } = props.data;
  return (
    <>
      {loading &&
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      }
      {error && <p>{error.message}</p>}
      {organization && !error &&
        <>
          <div>
            <Header organization={organization} />
            {organization.repositories.nodes.length > 0 &&
              <Repositories
                fetchedData={organization}
                path={organization.login}
              />
            }
          </div>
          <ViewerContext.Consumer>
            {(viewerDetails) => (
              <Footer {...viewerDetails} />
            )}
          </ViewerContext.Consumer>
        </>
      }
    </>
  )
}

const ORG_DATA = graphql(GET_ORG_INFO, {
  options: (props) => ({
    variables: { searchName: props.searchName },
    fetchPolicy: "cache-and-network",
  }),
})(Organization)

export default ORG_DATA;