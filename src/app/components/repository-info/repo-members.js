import React from 'react';
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

  showMembers(view, mentionableUsers) {
    switch (view) {
      case 'grid':
        return (<GridView members={mentionableUsers} />);
      case 'list':
        return (<ListView members={mentionableUsers} />);
      default:
        return;
    }
  }

  showWatchers(watchers) {
    if (watchers.length) {
      return (
        <div>
          <p><strong>Watchers</strong></p>
          <ListView members={watchers} />
        </div>
      )
    }
  }

  render() {
    const { currentView } = this.state;
    const { watchers, mentionableUsers } = this.props.repository;
    return (
      <div className="members-container">
        <div>
          {
            Object.values(views).map(view =>
              <div key={view.type}
                className={`view-tab ${view.type === currentView ? 'active-view' : ''}`}
                onClick={this.handleView.bind(this, view.type)}
              >
                {view.displayName}
              </div>
            )
          }
        </div>
        <div className="form d-flex">
          <div className="form-left">
            <p><strong>Members</strong></p>
            {
              this.showMembers(currentView, mentionableUsers.nodes)
            }
          </div>
          <div className="form-right">
            {
              this.showWatchers(watchers.nodes)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default RepoMembers;