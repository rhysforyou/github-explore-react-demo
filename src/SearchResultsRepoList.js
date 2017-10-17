import React from 'react'
import RepoList from './RepoList'
import debounce from './debounce'
import './SearchResultsRepoList.css'

const STATE_LOADING = 'loading'
const STATE_LOADED = 'loaded'

class SearchResultsRepoList extends React.Component {
  static defaultResults = [
    {
      html_url: 'https://github.com/facebook/react',
      full_name: 'facebook/react',
      language: 'JavaScript',
      description:
        'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
      topics: ['javascript', 'react', 'declarative', 'ui', 'library'],
      homepage: 'https://reactjs.org/'
    },
    {
      html_url: 'https://github.com/rails/rails',
      full_name: 'rails/rails',
      language: 'Ruby',
      description: 'Ruby on Rails',
      topics: ['rails', 'mvc', 'html', 'activerecord', 'activejob', 'ruby'],
      homepage: 'http://rubyonrails.org'
    },
    {
      html_url: 'https://github.com/django/django',
      full_name: 'django/django',
      language: 'Python',
      description: 'The Web framework for perfectionists with deadlines',
      topics: [
        'python',
        'django',
        'web',
        'framework',
        'orm',
        'templates',
        'models',
        'views',
        'apps'
      ],
      homepage: 'https://www.djangoproject.com/'
    }
  ]

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
  }, 300)

  render() {
    if (this.props.searchTerm == null || this.props.searchTerm.length === 0) {
      return <RepoList repos={SearchResultsRepoList.defaultResults} />
    } else if (this.state.loadingState === STATE_LOADED) {
      return <RepoList repos={this.state.repos} />
    } else {
      return <span class="SearchResultsRepoList__spinner" />
    }
  }
}

export default SearchResultsRepoList
