import React from 'react';
import { NavLink } from 'react-router-dom';
import 'app/styles/repositories.css';
import * as Constants from 'app/constants';
import LockIcon from 'assets/images/lock-icon.png';
import { Multiselect } from 'multiselect-react-dropdown';

class Repositories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterRepos: [],
      selectedLanguages: [],
    }
    this.resetMultiselect = this.resetMultiselect.bind(this);
    this.multiselectRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.path !== prevProps.path) {
      this.resetMultiselect();
    }
  }

  resetMultiselect() {
    this.resetSelectedLanguages();
    this.setState({
      filterRepos: [],
      selectedLanguages: [],
    });
  }

  getLanguageSelector(repositories) {
    const repositoriesLanguages = {};
    if (repositories) {
      repositories.forEach(repo => {
        return (
          repo.languages.nodes.forEach(lang => {
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

  filterReposByLanguage = (selectedList) => {
    const { fetchedData: { repositories } } = this.props;
    const filterLangArr = [];
    const repoArr = repositories.nodes;
    if (selectedList.length) {
      for (let i = 0; i < selectedList.length; i++) {
        filterLangArr.push(selectedList[i].name);
      }
      const filterRepoArr = repoArr.filter(repo => {
        let repoLangArr = [];
        repo.languages.nodes.map(lang => repoLangArr.push(lang.name));
        const found = repoLangArr.some(r => filterLangArr.includes(r))
        return found;
      });
      this.setState({
        filterRepos: filterRepoArr,
        selectedLanguages: filterLangArr,
      });
    } else {
      this.setState({
        filterRepos: repoArr,
        selectedLanguages: [],
      });
    }
  }

  resetSelectedLanguages = () => {
    this.multiselectRef.current.resetSelectedValues();
  }

  getMultiSelect = (repositories) => {
    const uniqueLanguages = this.getLanguageSelector(repositories);
    return (
      repositories && (
        <Multiselect
          options={Object.values(uniqueLanguages)}
          onSelect={this.filterReposByLanguage}
          onRemove={this.filterReposByLanguage}
          displayValue="name"
          avoidHighlightFirstOption="false"
          placeholder="Select Language"
          ref={this.multiselectRef}
        />
      )
    )
  }

  render() {
    const { path, fetchedData: { repositories, repositories: { nodes } } } = this.props;
    const { filterRepos, selectedLanguages } = this.state;
    let viewedRepositories = filterRepos.length ? filterRepos : repositories.nodes;

    return (
      <div className="app">
        <div className="d-flex">
          <div className="form-left">
            <p>
              <strong>{Constants.REPO_COUNT_TEXT}{repositories.totalCount}</strong>
            </p>
            <p>Viewed Repositories: {viewedRepositories.length}</p>
          </div>
          <div className="form-right mt-20">
            {
              this.getMultiSelect(nodes)
            }
          </div>
        </div>
        <div className="repo">
          <ul>
            {viewedRepositories.map(repository => (
              <React.Fragment key={repository.id}>
                <li>
                  <div className="mb-20">
                    <NavLink to={`/repository/${path}/${repository.name}`}><strong>{repository.name}</strong></NavLink>
                    {
                      repository.isPrivate ? <span className="private-icon"><img src={LockIcon} alt="no-img" className="icon"></img>Private</span> : ''
                    }
                  </div>
                  <div className="d-flex">
                    <a className="repo-url" href={repository.url} target="_blank" rel="noopener noreferrer">{repository.url}</a>
                    <div className="languages">
                      <span className="language">
                        {
                          repository.languages.nodes.map(language => (
                            <React.Fragment key={language.id}>
                              <span className="lang-color-container" style={{ backgroundColor: language.color }}></span>
                              <span className={selectedLanguages.includes(language.name) ? "highlight" : ""}>{language.name}</span>
                            </React.Fragment>
                          ))
                        }
                      </span>
                    </div>
                  </div>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Repositories;