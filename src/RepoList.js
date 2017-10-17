import React, { Component } from 'react'
import Repo from './Repo'
import './RepoList.css'

class RepoList extends Component {
  static defaultProps = {
    repos: []
  }

  render() {
    return (
      <ul className="RepoList">
        {this.props.repos.map(repo => (
          <Repo
            key={repo.full_name}
            url={repo.html_url}
            name={repo.full_name}
            language={repo.language}
            description={repo.description}
            topics={repo.topics}
            homepage={repo.homepage}
          />
        ))}
      </ul>
    )
  }
}

export default RepoList
