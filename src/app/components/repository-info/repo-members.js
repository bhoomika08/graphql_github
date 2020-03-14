import React from 'react';
import { NavLink } from 'react-router-dom';
import 'app/styles/repository-info.css';
import GridView from 'app/components/repository-info/views/grid-view';
import ListView from 'app/components/repository-info/views/list-view';

const defaultView = 'grid';

const views = {
  'grid': {
    type: 'grid',
    displayName: 'Grid View'
  },
  'list': {
    type: 'list',
    displayName: 'List View'
  }
}

class RepoMembers extends React.Component {
  state = {
    currentView: defaultView,
  }

  handleView(viewType) {
    this.setState({
      currentView: viewType
    })
  }

  showMembers(view) {
    switch (view) {
      case 'grid':
        return (<GridView repository={this.props.repository} />);
      case 'list':
        return (<ListView repository={this.props.repository} />);
      default:
        return;
    }
  }

  showWatchers() {
    if (this.props.repository.watchers.nodes.length) {
      return (
        <div>
          <p><strong>Watchers</strong></p>
          <table className="list-view">
            <tbody>
              {this.props.repository.watchers.nodes.map(watcher => (
                <tr key={watcher.id} className="listElement">
                  <td>{watcher.name}</td>
                  <td><NavLink to={`/${watcher.login}`}>{watcher.login}</NavLink></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  }

  render() {
    const { currentView } = this.state;
    return (
      <div className="members-container">
        <div>
          {
            Object.values(views).map(view =>
              <div key={view.type} className={`view-tab ${view.type === currentView ? 'active-view' : ''}`} onClick={this.handleView.bind(this, view.type)}>{view.displayName}</div>
            )
          }
        </div>
        <div className="form d-flex">
          <div className="form-left">
            <p><strong>Members</strong></p>
            {
              this.showMembers(currentView)
            }
          </div>
          <div className="form-right">
            {
              this.showWatchers()
            }
          </div>
        </div>
      </div>
    );
  }
}

export default RepoMembers;