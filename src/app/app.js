import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { requestData, requestDetails } from './actions/index'

import SearchComponent from './components/searchComponent'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

import '../sass/style.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: '',
      searchSuggestions: ''
    }
  }

  async componentDidMount() {
    const { dispatch } = this.props
    dispatch(requestData())
  }

  userSearch(event) {
    let searchTerm = event.target.value.toLowerCase()

    let searchSuggestions = this.props.allData.filter((searchData) => {
      let filteredResults = searchData.toLowerCase()
      return filteredResults.includes(searchTerm)
    })

    this.setState((state, props) => {
      return { searchSuggestions, searchTerm }
    })
  }

  clearSearch(event) {
    event.preventDefault()

    let searchTerm = ''

    this.setState((state, props) => {
      return { searchTerm, searchTerm }
    })
  }

  getDetails(event) {
    const { dispatch } = this.props

    this.clearSearch(event)
    dispatch(requestDetails(event.target.id.toLowerCase()))
  }

  render() {

    const { isFetchingAllData, allData, isFetchingDataDetails, detailsData, dispatch } = this.props
    const { category, icon_url, id, url, value } = this.props.detailsData

    let searchSuggestions = this.state.searchSuggestions
    let searchTerm = this.state.searchTerm

    let updatedSearchSuggestions = null

    {
      (searchTerm != '' && searchSuggestions.length > 0)
      ? updatedSearchSuggestions = searchSuggestions.map((updatedSearchSuggestions, index) => {
        return (
          <div
            className="item data-category"
            id={updatedSearchSuggestions}
            key={index}
            onClick={this.getDetails.bind(this)}>
            <i className="fas fa-2x fa-thumbtack"></i>
            <h4>{updatedSearchSuggestions.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })}</h4>
            <span>
              <p>Click here...</p>
            </span>
          </div>)
      })
      : null
    }

    {
      (searchTerm != '' && searchSuggestions.length == 0)
      ? updatedSearchSuggestions = <div className="item data-category-no-results">
        <h4>No result(s)</h4>
      </div>
      : null
    }

    {
      (detailsData != '' && searchSuggestions.length > 0)
      ? updatedSearchSuggestions = searchSuggestions.map((updatedSearchSuggestions, index) => {
        return (
          <a
            href="#"
            id={updatedSearchSuggestions}
            className="dropdown-item"
            onClick={this.getDetails.bind(this)}
            key={index}
          >
            {updatedSearchSuggestions.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })}
          </a>
        )
      })
      : null
    }

    {
      (detailsData != '' && searchSuggestions.length == 0)
      ? updatedSearchSuggestions = <a href="#" className="dropdown-item" >No result(s)</a>
      : null
    }

    return (
      <div>
        <div className="container">
          <header>
            <h1>SovTech Laugh Library</h1>
            <h2>Brighten your day with a chuckle!</h2>

            <p>Browse our collection of random jokes</p>
          </header>

          <div className="grid">
            <div className="item">
              <div>
                <div className="btn-group search">
                  <SearchComponent
                    searchTerm={searchTerm}
                    searchSuggestions={searchSuggestions}
                    userSearch={this.userSearch.bind(this)}
                    clearSearch={this.clearSearch.bind(this)}
                    placeHolder="Search for category..." />

                  {/* Filter data if category detail data is empy */}

                  {(detailsData == '' && updatedSearchSuggestions != null)
                    ? <div className="grid">{updatedSearchSuggestions}</div>
                    : null
                  }

                  {/* Display search sugggestions if category detail is not empty */}

                  {(detailsData != '' && updatedSearchSuggestions != null && searchTerm != '')
                    ? <Fragment>
                      <div className="dropdown-menu">
                        {updatedSearchSuggestions}</div>
                    </Fragment>
                    : null
                  }
                </div>

                {/* Get all category data on load */}

                {(detailsData == '' && updatedSearchSuggestions == null)
                  ? <Fragment>
                    {isFetchingAllData &&
                      <p><i className="fas fa-spinner fa-pulse"></i> Loading categories...</p>
                    }

                    {!isFetchingAllData &&
                      <div className="grid">
                        {allData.map((data, index) =>
                          <div
                            className="item data-category"
                            key={index}
                            onClick={() => dispatch(requestDetails(data))} >
                            <i className="fas fa-2x fa-thumbtack"></i>
                            <h4>{data.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })}</h4>
                            <span>
                              <p>Click here...</p>
                            </span>
                          </div>
                        )}
                      </div>}
                  </Fragment>
                  : null}

                {/* Display category detail data */}

                {detailsData != ''
                  ? <Fragment>
                    {isFetchingDataDetails &&
                      <p><i className="fas fa-spinner fa-pulse"></i> Loading details...</p>
                    }
                    {!isFetchingDataDetails &&
                      <div className="grid">
                        <div className="item data-details">
                          <h3>And here it is...</h3>

                          <blockquote>{value}</blockquote>
                          <a
                            href="#"
                            className="btn btn-default"
                            onClick={() => dispatch(requestDetails())}>
                            Back
								    					</a>
                          <a
                            href="#"
                            className="btn btn-primary"
                            onClick={() => dispatch(requestDetails(category[0]))}>
                            Get another
										    			</a>

                          <div className="grid">
                            {category != null
                              ? <Fragment>
                                <div className="item data-details-meta">
                                  <h4>Category:</h4>
                                  <p>{category[0].replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })}</p>
                                </div>
                                <div className="item data-details-meta">
                                  <h4>ID:</h4>
                                  <p>{id}</p>
                                </div>
                                <div className="item data-details-meta">
                                  <h4>URL:</h4>
                                  <p><a href={url} target="_blank">{url}</a></p>
                                </div>
                              </Fragment>
                              : <Fragment>
                                <div className="item data-details-meta">
                                  <h4>ID:</h4>
                                  <p>{id}</p>
                                </div>
                                <div className="item data-details-meta">
                                  <h4>URL:</h4>
                                  <p><a href={url} target="_blank">{url}</a></p>
                                </div>
                              </Fragment>
                            }
                          </div>
                        </div>
                      </div>
                    }
                  </Fragment>
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    )


  }

}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { requestData, requestDetails } = state.rootReducer
  return {
    isFetchingAllData: requestData.isFetching,
    allData: requestData.data,
    isFetchingDataDetails: requestDetails.isFetching,
    detailsData: requestDetails.data
  }
}

export default connect(mapStateToProps)(App)