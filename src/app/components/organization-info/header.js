import React from 'react';
import * as Constants from '../../constants/constants'
import '../../styles/header.css';
import { Multiselect } from 'multiselect-react-dropdown';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguages: [],
      isVisible: false,
    }
    this.selectedLanguagesArr = [];
  }

  getSelectedLanguages = (event) => {
    event.preventDefault();
    this.props.filterRepos(this.selectedLanguagesArr);
  }

  getLanguageSelector(organization) {
    const repositoriesLanguages = {};
    if (organization) {
      organization.repositories.nodes.map(repo => {
        return (
        repo.languages.nodes.map(lang => {
          return (
          repositoriesLanguages[lang.name] = {
            name: lang.name,
            color: lang.color,
          });
        }));
      });
    }
    return repositoriesLanguages;
  }

  getSelectedList = (selectedList) => {
    this.selectedLanguagesArr = selectedList;
    if (!this.selectedLanguagesArr.length) {
      this.props.filterRepos(this.selectedLanguagesArr);
    }
  }

  render() {
    const uniqueLanguages = this.getLanguageSelector(this.props.organization);
    return (
      <div className="app">
        <h1>{Constants.TITLE}</h1>
        <div>
          <div className="query-type-button" onClick={this.props.setQueryType}>{this.props.text.buttonText}</div>
        </div>
        <div>
          <label htmlFor="url">
            {this.props.text.heading}
          </label>
        </div>
        <div className="form d-flex" onSubmit={this.props.onSubmit}>
          <div className="form-left">
            <input
              id="url"
              type="text"
              className="search-box"
              value={this.props.path}
              onChange={this.props.onChange}
              placeholder={this.props.text.searchPlaceholder}
            />
            <div>
              <button onClick={this.props.onSubmit}>Search</button>
            </div>
          </div>
          <div className="form-right">
            {
              this.props.organization ? (
                <>
                  <Multiselect
                    options={Object.values(uniqueLanguages)}
                    onSelect={this.getSelectedList}
                    onRemove={this.getSelectedList}
                    displayValue="name"
                    avoidHighlightFirstOption="false"
                    placeholder="Select Language"
                    style={{ option: { color: "blue" } }}
                  />
                  <div>
                    <button onClick={this.getSelectedLanguages}>Search</button>
                  </div>
                </>
              ) : ''
            }
          </div>
        </div>
        <div>
          <button onClick={this.props.onClick}>Clear</button>
        </div>
        <hr />
      </div >
    );
  }
}

export default Header;