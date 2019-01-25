import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, Link } from 'gatsby'

import Navigation from './Navigation'
import Footer from './Footer'
import './layout.css'

const Layout = ({ children, count }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
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
        <Navigation />

        <section className="main hero is-primary is-medium">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">GitHub Actions</h1>
              <h2 className="subtitle"> An open source list of actions.</h2>
              <p>Just click on an action below to get started.</p>
              <a
                className="button is-large add-action"
                href="https://github.com/boyney123/github-actions/blob/master/CONTRIBUTING.md#adding-your-configuration-to-github-actions"
                target="_blank"
              >
                <i class="fab fa-github" />
                Add an action
              </a>
              <div className="badges">
                <a
                  href="https://twitter.com/intent/tweet?text=Check%20out%20this%20GitHub%20action%20list%20from%20%40boyney123%20https%3A%2F%2Fgithub-actions.netlify.com"
                  rel="nofollow"
                  target="_blank"
                >
                  <img
                    className="badges__twitter"
                    src="https://camo.githubusercontent.com/c4d1ba0479b8b6b97290be3e5af3effb94266475/68747470733a2f2f696d672e736869656c64732e696f2f747769747465722f75726c2f68747470732f6769746875622e636f6d2f6b656e7463646f6464732f72656163742d74657374696e672d6c6962726172792e7376673f7374796c653d736f6369616c"
                  />
                </a>
                <a
                  href="https://github.com/boyney123/github-actions"
                  target="_blank"
                >
                  <img
                    className="badges__github"
                    src="https://img.shields.io/github/stars/boyney123/github-actions.svg?style=social"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="content">{children}</div>
        <Footer />
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
