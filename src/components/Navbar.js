import React, { Component } from 'react'

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                    <a
                        className="navbar-brand col-sm-3 col-md-2 mr-0"
                        href="https://github.com/Harsh18894/"
                        target="_blank"
                        rel="noopener noreferrer">Social Network Project</a>
                </nav>
            </div>
        );
    }
}

export default Navbar