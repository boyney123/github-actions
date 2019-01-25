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
      <Helmet title={`Github-Actions - ${frontmatter.title}`} />
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
