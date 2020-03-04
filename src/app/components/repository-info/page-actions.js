import React from 'react';
import { loader } from 'graphql.macro';
import gql from 'graphql-tag';
import '../../styles/repository-info.css';
import EyeIcon from '../../../assets/images/eye.png';
import UnstarIcon from '../../../assets/images/unstar.png';
import StarredIcon from '../../../assets/images/starred.png';
import ForkIcon from '../../../assets/images/fork.png';

const ADD_STAR = loader('../../graphql/mutations/addStar.gql');
const REMOVE_STAR = loader('../../graphql/mutations/removeStar.gql');

class PageActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStarred: props.repository.viewerHasStarred,
      stargazersCount: props.repository.stargazers.totalCount
    }
    this.mutateStar = this.mutateStar.bind(this);
    this.isSubscribed = this.isSubscribed.bind(this);
  }

  generateActions() {
    const { watchers, forkCount, viewerHasStarred } = this.props.repository;
    const { isStarred, stargazersCount } = this.state;
    return {
      watch: {
        label: "Watch",
        icon: EyeIcon,
        count: watchers.totalCount,
      },
      star: {
        label: isStarred ? "Unstar" : "Star",
        icon: isStarred ? StarredIcon : UnstarIcon,
        count: stargazersCount,
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
    this.state.isStarred ? this.removeStar() : this.addStar()
  }

  addStar = () => {
    this.props.client.mutate({
      mutation: ADD_STAR,
      variables: {
        starrableId: this.props.repository.id
      }
    }).then(({ data }) => {
      this.setState({
        isStarred: true,
        stargazersCount: data.addStar.starrable.stargazers.totalCount
      })
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  removeStar = () => {
    this.props.client.mutate({
      mutation: REMOVE_STAR,
      variables: {
        starrableId: this.props.repository.id
      }
    }).then(({ data }) => {
      this.setState({
        isStarred: false,
        stargazersCount: data.removeStar.starrable.stargazers.totalCount
      })
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  isSubscribed() {
    const todo = this.props.client.readFragment({
      id: this.props.repository.id,
      fragment: gql`
        fragment subscribe on GET_REPOSITORIES_INFO {
          viewerCanSubscribe
        }
      `,
    });

    this.props.client.writeFragment({
      id: this.props.repository.id,
      fragment:
      gql`
        fragment subscribe on GET_REPOSITORIES_INFO {
          viewerCanSubscribe
        }
       `,
      data: {
        todo: {
          __typename: this.props.repository.__typename,
          viewerCanSubscribe: false,
        }
      },
    });
    console.log(todo);
  }

  render() {
    return (
      <div>
        <ul className="actions-container">
          {
            Object.values(this.generateActions()).map(action => (
              <li key={action.label} onClick={action.onClick}>
                <span className="action"><img src={action.icon} alt="na" className="icon"></img>{action.label}</span>
                <span className="count">{action.count}</span>
              </li>
            ))
          }
          <li onClick={this.isSubscribed}>
            <span>Subscribe</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default PageActions;