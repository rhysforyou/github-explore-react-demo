import React, { Component } from 'react'
import './Repo.css'

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
