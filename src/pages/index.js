import React, { Component } from 'react'
import { navigate, graphql } from 'gatsby'
import urljoin from 'url-join'

import Layout from '../components/layout'
import ActionCard from '../components/Action-Card'

class IndexPage extends Component {
  render() {
    const { data: { allMarkdownRemark: { edges = [] } = {} } = {} } = this.props

    return (
      <Layout count={edges.length}>
        <input />
        <div className="container is-fluid">
          <div className="columns is-multiline">
            {edges.map(({ node = {} }) => {
              const { frontmatter } = node
              const { path, title, subtitle, author, github_url } = frontmatter

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
