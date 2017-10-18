import React from 'react'
import './SearchBox.css'

/**
 * A controlled search input component
 *
 * @param {Object} props the React component's props
 * @param {string} props.value the field's current value
 * @param {function} props.onChange handler to be called when the input's value changes
 */
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
