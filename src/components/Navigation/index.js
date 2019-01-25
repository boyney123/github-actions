import React from 'react'

const Navigation = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <h1>github-actions</h1>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="">
              <a
                className="is-primary"
                href="https://github.com/features/actions"
                target="_blank"
              >
                <strong>Introduction to GitHub Actions</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
