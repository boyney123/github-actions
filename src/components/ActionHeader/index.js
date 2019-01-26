import React from 'react'
import urljoin from 'url-join'

const ActionHeader = ({ title, github_url, author }) => {
  return (
    <section className="main hero is-primary is-medium">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">{title}</h1>
          <h2 className="subtitle">By {author}</h2>
        </div>
      </div>
    </section>
  )
}

export default ActionHeader
