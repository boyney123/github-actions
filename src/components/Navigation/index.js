import React from 'react'

import './styles.css'

const Navigation = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="">
              <a
                className="is-primary"
                href="https://github.com/features/actions"
                target="_blank"
              >
                <strong>Getting Started with Actions</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
