import React from 'react'
import './SearchBox.css'

class SearchBox extends React.Component {
  render() {
    return (
      <input
        className="SearchBox"
        type="search"
        placeholder="Search Repos…"
        value={this.props.value}
        onChange={this.props.onChange}
      />
    )
  }
}

export default SearchBox
