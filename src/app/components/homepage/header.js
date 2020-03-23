import React from 'react';
import * as Constants from 'app/constants';
import 'app/styles/header.css';

const headerTextForUser = {
  heading: Constants.SHOW_USER_REPO_TEXT,
  searchPlaceholder: Constants.USER_SEARCH_PLACEHOLDER,
}

const headerTextForOrg = {
  heading: Constants.SHOW_ORG_REPO_TEXT,
  searchPlaceholder: Constants.ORG_SEARCH_PLACEHOLDER,
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    const { searchName, typeName } = props;
    this.state = {
      searchValue: searchName || '',
      isOrganization: typeName === Constants.USER_TEXT ? false : true,
    };
  }

  onChangeHandler = event => {
    this.setState({ searchValue: event.target.value });
  };

  onSubmitHandler = event => {
    const { isOrganization, searchValue } = this.state;
    event.preventDefault();
    if (isOrganization) {
      this.props.history.push(`/${Constants.ORGANIZATION_TEXT}/${searchValue}`);
    } else {
      this.props.history.push(`/${Constants.USER_TEXT}/${searchValue}`);
    }
  };

  clearData = () => {
    this.setState({
      searchValue: '',
    }, this.props.history.push(''));
  }

  setOrganizationType = () => {
    this.setState({
      searchValue: '',
      isOrganization: true,
    }, this.props.history.push(''));
  }

  setUserType = () => {
    this.setState({
      searchValue: '',
      isOrganization: false,
    }, this.props.history.push(''));
  }

  render() {
    const { isOrganization, searchValue } = this.state;
    return (
      <div className="app">
        <h1>{Constants.HOMEPAGE_TITLE}</h1>
        <div className="button-container">
          <div className={isOrganization ? 'btn-disabled' : ''} onClick={this.setOrganizationType}>Organization</div>
          <div className={isOrganization ? 'ml-10 ' : 'ml-10 btn-disabled'} onClick={this.setUserType}>User</div>
        </div>
        <div>
          <label htmlFor="url">
            {isOrganization ? headerTextForOrg.heading : headerTextForUser.heading}
          </label>
        </div>
        <div className="form">
          <input
            id="url"
            type="text"
            className="search-box"
            value={searchValue}
            onChange={this.onChangeHandler}
            placeholder={isOrganization ? headerTextForOrg.searchPlaceholder : headerTextForUser.searchPlaceholder}
          />
          <div>
            <button onClick={this.onSubmitHandler}>Search</button>
            <button className="ml-10" onClick={this.clearData}>Clear</button>
          </div>
        </div>
        <hr />
      </div >
    );
  }
}

export default Header;