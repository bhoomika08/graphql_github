import React from 'react';
import { loader } from 'graphql.macro';
import gql from 'graphql-tag';
import 'app/styles/repository-info.css';
import EyeIcon from 'assets/images/eye.png';
import UnstarIcon from 'assets/images/unstar.png';
import StarredIcon from 'assets/images/starred.png';
import ForkIcon from 'assets/images/fork.png';
import { graphql } from "react-apollo";
import { flowRight as compose } from 'lodash';

const ADD_STAR = loader('app/graphql/mutations/addStar.gql');
const REMOVE_STAR = loader('app/graphql/mutations/removeStar.gql');

const viewer = {
  __typename: "User",
  id: 10,
  name: "Bhoomika",
  login: "bhoomika08"
}

class PageActions extends React.Component {
  constructor(props) {
    super(props);
    const { viewerHasStarred, viewerCanSubscribe, stargazers } = props.repository;
    this.state = {
      isSubscribed: viewerCanSubscribe,
      isStarred: viewerHasStarred,
      stargazersCount: stargazers.totalCount
    }
  }

  generateActions() {
    const { forkCount, viewerHasStarred, viewerCanSubscribe, watchers, stargazers } = this.props.repository;
    return {
      watch: {
        label: viewerCanSubscribe ? "Watch" : "Unwatch",
        icon: EyeIcon,
        count: watchers.totalCount,
        onClick: this.modifyWatchCount,
      },
      star: {
        label: viewerHasStarred ? "Unstar" : "Star",
        icon: viewerHasStarred ? StarredIcon : UnstarIcon,
        count: stargazers.totalCount,
        isStarred: viewerHasStarred,
        onClick: this.mutateStar,
      },
      fork: {
        label: "Fork",
        icon: ForkIcon,
        count: forkCount,
      },
    }
  }

  mutateStar = () => {
    this.props.repository.viewerHasStarred ? this.removeStar() : this.addStar()
  }

  addStar = () => {
    this.props.addStarMutation({
      variables: {
        starrableId: this.props.repository.id
      },
    });
  }

  removeStar = () => {
    this.props.removeStarMutation({
        variables: {
          starrableId: this.props.repository.id
        },
    });
  }

  writeFragment = (args, data) => {
    this.props.client.writeFragment({ ...args }, data);
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
        nodes: data.watchers.nodes.filter(node => node.login !== "bhoomika08"),
      }
    }
    this.props.client.writeFragment({ ...args, data: newData });
  }

  watch = (args) => {
    const data = this.props.client.readFragment({ ...args });
    const newData = {
      ...data,
      viewerCanSubscribe: false,
      watchers: {
        ...data.watchers,
        totalCount: data.watchers.totalCount + 1,
        nodes: data.watchers.nodes.concat(viewer),
      }
    }
    this.props.client.writeFragment({ ...args, data: newData });
    console.log("watch:", this.props.repository);
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
  graphql(ADD_STAR, { name: "addStarMutation" }),
  graphql(REMOVE_STAR, { name: "removeStarMutation" })
)(PageActions);

export default MUTATE_STAR;