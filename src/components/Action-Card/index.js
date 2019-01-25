import React from 'react'
import urljoin from 'url-join'
import { navigate } from 'gatsby'

import './styles.css'

const AcitonCard = ({ path, title, author, subtitle, github_url } = {}) => {
  const urlParts = github_url.split('github.com')
  const repoPath = urlParts[urlParts.length - 1]

  const starBadgeUrl = `${urljoin(
    'https://img.shields.io/github/stars',
    repoPath
  )}.svg?style=social`

  return (
    <div className="action-card__container column is-one-third">
      <div className="action-card" onClick={() => navigate(path)}>
        <div className="action-card-icon">
          <img
            src="https://github.githubassets.com/images/modules/site/features/action-build.svg"
            alt="Build"
            className="position-relative"
          />
        </div>
        <div className="action-card__header">
          <h4>{title}</h4>
          <p>by {author}</p>
          <img src={starBadgeUrl} />
        </div>
        <div className="action-card__body">
          <p>{subtitle}</p>
        </div>
        <div className="action-card__footer">
          <span>Read more</span>
        </div>
      </div>
    </div>
  )
}

export default AcitonCard
