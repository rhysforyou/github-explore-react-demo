import React from 'react'
import RepoList from '../components/RepoList'
import debounce from '../util/debounce'
import defaultResults from './defaultResults.json'
import './SearchResultsRepoList.css'

const STATE_LOADING = 'loading'
const STATE_LOADED = 'loaded'
const STATE_ERROR = 'error'

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

  fetchRepos = debounce(searchTerm => {
    const url = new URL(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(
        searchTerm
      )}`
    )

    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (searchTerm !== this.props.searchTerm) {
          return
        }

        this.setState({
          repos: json.items,
          loadingState: STATE_LOADED
        })
      })
      .catch(error => {
        if (searchTerm !== this.props.searchTerm) {
          return
        }

        this.setState({
          repos: [],
          loadingState: STATE_ERROR
        })
      })
  }, 300)

  render() {
    if (this.props.searchTerm == null || this.props.searchTerm.length === 0) {
      return <RepoList repos={defaultResults} />
    } else if (this.state.loadingState === STATE_LOADED) {
      return <RepoList repos={this.state.repos} />
    } else if (this.state.loadingState === STATE_ERROR) {
      return <span>Error loading</span>
    } else {
      return <span className="SearchResultsRepoList__spinner" />
    }
  }
}

export default SearchResultsRepoList
