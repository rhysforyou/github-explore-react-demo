import React from 'react'
import RepoList from '../components/RepoList'
import Error from '../components/Error'
import debounce from '../util/debounce'
import defaultResults from './defaultResults.json'
import './SearchResultsRepoList.css'

const STATE_LOADING = 'loading'
const STATE_LOADED = 'loaded'
const STATE_ERROR = 'error'

/**
 * A container component that renders search results from the GitHub API based
 * on its `searchTerm` prop.
 *
 * @param {Object} props the React component's props
 * @param {string} props.searchTerm the search term to display results for
 */
class SearchResultsRepoList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loadingState: STATE_LOADED,
      repos: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.searchTerm !== this.props.searchTerm &&
      nextProps.searchTerm != null
    ) {
      this.setState({ loadingState: STATE_LOADING })
      this.fetchRepos(nextProps.searchTerm)
    }
  }

  fetchRepos = debounce(async searchTerm => {
    try {
      const url = new URL(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(
          searchTerm
        )}`
      )

      const res = await fetch(url)
      const json = await res.json()

      if (searchTerm !== this.props.searchTerm) {
        return
      }

      this.setState((state, props) => {
        if (this.props.searchTerm === searchTerm) {
          return {
            ...state,
            repos: json.items,
            loadingState: STATE_LOADED
          }
        } else {
          return state
        }
      })
    } catch (error) {
      if (searchTerm !== this.props.searchTerm) {
        return
      }

      this.setState({
        repos: [],
        loadingState: STATE_ERROR
      })
    }
  }, 300)

  render() {
    if (this.props.searchTerm == null || this.props.searchTerm.length === 0) {
      return <RepoList repos={defaultResults} />
    } else if (this.state.loadingState === STATE_LOADED) {
      return <RepoList repos={this.state.repos} />
    } else if (this.state.loadingState === STATE_ERROR) {
      return <Error message="Error loading repos" />
    } else {
      return <span className="SearchResultsRepoList__spinner" />
    }
  }
}

export default SearchResultsRepoList
