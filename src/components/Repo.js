import React, { Component } from 'react'
import './Repo.css'

/**
 * A component for displaying the details of a GitHub repo
 *
 * @param {Object} props the React component's props
 * @param {string} props.name the full display name of the repo
 * @param {string} props.url a URL to the repo's GitHb page
 * @param {string} props.language the primary programming language in this repo
 * @param {string} props.description a short description of the repo
 * @param {Array<string>} props.topics the topics this repo belongs to
 * @param {string} props.homepage a URL to the project's homepage
 *
 */
class Repo extends Component {
  render() {
    return (
      <li className={`Repo Repo--language-${this.props.language || 'Unknown'}`}>
        <h2 className="Repo__name">
          <a href={this.props.url}>{this.props.name}</a>
        </h2>
        <span className="Repo__language">{this.props.language}</span>
        <span className="Repo__description">{this.props.description}</span>
        {this.props.topics && (
          <ul className="Repo__topics">
            {this.props.topics.map(topic => {
              return <li key={topic}>{topic}</li>
            })}
          </ul>
        )}
        <a className="Repo__homepage" href={this.props.homepage}>
          {this.props.homepage}
        </a>
      </li>
    )
  }
}

export default Repo
