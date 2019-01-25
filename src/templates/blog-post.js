import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

import './blog-post.css'

export default function Template({ data }) {
  const { markdownRemark: post } = data
  const { frontmatter } = post
  const { title, subtitle, github_url, twitter } = frontmatter
  return (
    <Layout className="blog-post-container">
      <Helmet title={`Github-Actions - ${frontmatter.title}`}>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charset="utf-8"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
          integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP"
          crossorigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css"
        />
        <html lang="en" />
      </Helmet>
      <div className="blog-post container">
        <h1>{title}</h1>
        <p>{subtitle}</p>

        <a href={`${github_url}`} target="_blank">
          {github_url}
        </a>

        <hr />
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        subtitle
        github_url
        twitter
      }
    }
  }
`
