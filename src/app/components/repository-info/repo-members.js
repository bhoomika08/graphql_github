import React from 'react';
//import { NavLink } from 'react-router-dom';
import '../../styles/repository-info.css';
import GridView from '../repository-info/views/grid-view';
import ListView from '../repository-info/views/list-view';

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
    view: defaultView,
  }

  handleView(viewType) {
    this.setState({
      view: viewType
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

  render() {
    const { view } = this.state;
    return (
      <div className="members-container">
        <div>
          {
            Object.values(views).map(view =>
              <div key={view.type} className={`view-tab ${view.type === this.state.view ? 'active-view' : ''}`} onClick={this.handleView.bind(this, view.type)}>{view.displayName}</div>
            )
          }
        </div>
        <div className="members-div">
          {
            view ? this.showMembers(view) : this.showMembers(defaultView)
          }
        </div>
      </div>
    );
  }
}

export default RepoMembers;