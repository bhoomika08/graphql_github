import React from 'react';
import gql from 'graphql-tag';
import { loader } from 'graphql.macro';
import EyeIcon from 'assets/images/eye.png';
import ForkIcon from 'assets/images/fork.png';
import UnstarIcon from 'assets/images/unstar.png';
import StarredIcon from 'assets/images/starred.png';
import { FORK, STAR, UNSTAR, UNWATCH, WATCH } from 'app/constants';
import { graphql, withApollo } from "react-apollo";
import { flowRight as compose } from 'lodash';

const ADD_STAR = loader('app/graphql/mutations/addStar.gql');
const REMOVE_STAR = loader('app/graphql/mutations/removeStar.gql');

const viewer = {
  __typename: "User",
  id: '08',
  avatarUrl: "https://avatars3.githubusercontent.com/u/29602906?v=4",
  name: "Bhoomika",
  login: "bhoomika08",
}

class PageActions extends React.Component {
  generateActions() {
    const { forkCount, viewerHasStarred, viewerCanSubscribe, watchers, stargazers } = this.props.repository;
    return {
      watch: {
        label: viewerCanSubscribe ? WATCH : UNWATCH,
        icon: EyeIcon,
        count: watchers.totalCount,
        onClick: this.modifyWatchCount,
      },
      star: {
        label: viewerHasStarred ? UNSTAR : STAR,
        icon: viewerHasStarred ? StarredIcon : UnstarIcon,
        count: stargazers.totalCount,
        isStarred: viewerHasStarred,
        onClick: this.mutateStar,
      },
      fork: {
        label: FORK,
        icon: ForkIcon,
        count: forkCount,
      },
    }
  }

  mutateStar = () => {
    this.props.repository.viewerHasStarred ? this.removeStar() : this.addStar()
  }

  addStar = () => {
    const { id, stargazers } = this.props.repository;
    this.props.addStarMutation({
      variables: {
        starrableId: id
      },
      optimisticReposnse: {
        starrable: {
          id: id,
          viewerHasStarred: true,
          stargazers: {
            totalCount: stargazers.totalCount + 1
          }
        }
      }
    });
  }

  removeStar = () => {
    const { id, stargazers } = this.props.repository;
    this.props.removeStarMutation({
      variables: {
        starrableId: id
      },
      optimisticReposnse: {
        starrable: {
          id: id,
          viewerHasStarred: false,
          stargazers: {
            totalCount: stargazers.totalCount - 1
          }
        }
      }
    });
  }

  modifyWatchCount = () => {
    const id = 'Repository:' + this.props.repository.id,
      fragment = gql`
        fragment watcher on Repository {
          __typename
          id
          viewerCanSubscribe
          watchers(first: 5) {
            __typename
            totalCount
            nodes {
              __typename
              id
              avatarUrl
              name
              login
            }
          }
        }
      `;
    this.props.repository.viewerCanSubscribe ? this.watch({ id, fragment }) : this.unwatch({ id, fragment });
  }

  unwatch = (args) => {
    const data = this.props.client.readFragment({ ...args });
    const newData = {
      ...data,
      viewerCanSubscribe: true,
      watchers: {
        ...data.watchers,
        totalCount: data.watchers.totalCount - 1,
        nodes: data.watchers.nodes.filter(node => node.login !== viewer.login),
      }
    }
    this.props.client.writeFragment({ ...args, data: newData });
  }

  watch = (args) => {
    const data = this.props.client.readFragment({ ...args });
    let newData = {
      id: this.props.repository.id,
      __typename: 'Repository',
      viewerCanSubscribe: false,
      watchers: {
        __typename: 'UserConnection',
        totalCount: data.watchers.totalCount + 1,
        nodes: [...data.watchers.nodes.concat(viewer)],
      }
    }
    this.props.client.writeFragment({ ...args, data: newData });
  }

  render() {
    return (
      <div>
        <ul className="actions-container">
          {
            Object.values(this.generateActions()).map(action => (
              <li key={action.label} onClick={action.onClick}>
                <span className="action"><img src={action.icon} alt="icon" className="icon"></img>{action.label}</span>
                <span className="count">{action.count}</span>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

const MUTATE_STAR = compose(
  withApollo,
  graphql(ADD_STAR, { name: "addStarMutation" }),
  graphql(REMOVE_STAR, { name: "removeStarMutation" }),
)(PageActions);

export default MUTATE_STAR;