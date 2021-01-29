import React from 'react';
import {Link} from 'react-router-dom';
import StreamingWidget from '../StreamingWidget/StreamingWidget';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {

    return(
            <div className="sidenav">
                <div className="nav-btns-wrapper">
                        <Link className="home-link"
                        to="/homePage">
                            <FontAwesomeIcon icon={faHome} size="lg" color="white" />
                            <button className="btn home-btn">Home</button>
                        </Link>
                        <Link className="search-link"
                            to="/search">
                            <FontAwesomeIcon icon={faSearch} size="lg" color="white" />
                            <button className="btn search-btn">Search</button>
                        </Link>
                </div>
            </div>
    )
};

export default NavBar;