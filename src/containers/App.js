import React from 'react'
import SearchBox from '../components/SearchBox'
import SearchResultsRepoList from './SearchResultsRepoList'
import './App.css'

/**
 * The top level container component responsible for defining the app's basic
 * layout and maintaining application-wide state (in this case the search term).
 */
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: ''
    }
  }

  handleSearchTermChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  render() {
    return (
      <div className="App">
        <header className="App__header">
          <h1 className="App__title">GitHub Explorer</h1>
        </header>
        <main className="App__content">
          <SearchBox
            value={this.state.searchTerm}
            onChange={e => this.handleSearchTermChange(e)}
          />
          <SearchResultsRepoList searchTerm={this.state.searchTerm} />
        </main>
      </div>
    )
  }
}

export default App
