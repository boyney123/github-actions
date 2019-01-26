import React, { Component } from 'react'
import { navigate, graphql } from 'gatsby'
import urljoin from 'url-join'

import Fuse from 'fuse.js'

import Layout from '../components/layout'
import ActionCard from '../components/Action-Card'
import SiteHeader from '../components/SiteHeader'

class IndexPage extends Component {
  state = {
    filter: '',
  }

  handleFilter(event) {
    const value = event.target.value
    this.setState({ filter: value })
  }

  render() {
    const {
      data: { allMarkdownRemark: { edges = [] } = {} } = {},
      test,
    } = this.props

    const items = edges.map(item => {
      const { node } = item
      const { frontmatter } = node
      return {
        ...frontmatter,
      }
    })

    const options = {
      keys: ['author', 'tags', 'title'],
      shouldSort: true,
      threshold: 0.3,
    }

    var fuse = new Fuse(items, options)
    const filteredItems =
      this.state.filter !== '' ? fuse.search(this.state.filter) : items

    return (
      <Layout
        header={
          <SiteHeader
            handleFilter={this.handleFilter.bind(this)}
            count={edges.length}
          />
        }
      >
        <div className="container is-fluid">
          <div className="columns is-multiline">
            {filteredItems.length > 0 &&
              filteredItems.map(item => {
                const {
                  path,
                  title,
                  subtitle,
                  author,
                  github_url,
                  tags = [],
                } = item

                const urlParts = github_url.split('github.com')
                const repoPath = urlParts[urlParts.length - 1]

                const starBadgeUrl = `${urljoin(
                  'https://img.shields.io/github/stars',
                  repoPath
                )}.svg?style=social`

                return (
                  <ActionCard
                    path={path}
                    title={title}
                    author={author}
                    subtitle={subtitle}
                    github_url={github_url}
                  />
                )
              })}
            {filteredItems.length === 0 && (
              <section className="no-results">
                <h1 className="title mt20">No Results Found... </h1>
                <p className="mt20">Try searching for "AWS" or "Docker"</p>
              </section>
            )}
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            path
            tags
            author
            subtitle
            github_url
          }
        }
      }
    }
  }
`
