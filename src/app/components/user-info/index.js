import React from 'react';
import { graphql } from "react-apollo";
import { loader } from 'graphql.macro';
import PageHeader from 'app/components/user-info/page-header';
import Repositories from 'app/components/organization-info/repositories'


const GET_USER_INFO = loader('app/graphql/queries/user-info.gql')

const UserInfo = (props) => {
  const { loading, error, user } = props.data;
  return (
    <>
      {loading && <div className="loader-container">
        <div className="loader"></div>
      </div>}
      {error && <p>{error.message}</p>}
      {user &&
        <>
          <PageHeader user={user} />
          <Repositories
            fetchedData={user}
            path={user.login}
          />
        </>
      }
    </>
  );
}

const USER_INFO = graphql(GET_USER_INFO, {
  options: (props) => ({
    variables: {
      searchName: props.searchName ? props.searchName : props.match.params.userLogin,
    },
    fetchPolicy: "cache-and-network",
  }),
})(UserInfo)

export default USER_INFO;