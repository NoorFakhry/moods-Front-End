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
                    <div className="sidebar-btn">
                        <Link className="home-link"
                        to="/homePage">
                            <FontAwesomeIcon className="home-icon"
                            icon={faHome} size="lg" />
                            <button className="btn home-btn">Home</button>
                        </Link>
                    </div>
                    <div className="sidebar-btn">
                        <Link className="search-link"
                            to="/search">
                            <FontAwesomeIcon className="search-icon"
                            icon={faSearch} size="lg" />
                            <button className="btn search-btn">Search</button>
                        </Link>
                    </div>
                </div>
            </div>
    )
};

export default NavBar;

{/* <div className="sidebar-btn">
                    <Link className="home-link"
                    to="/homePage">
                        <FontAwesomeIcon className="home-icon"
                        icon={faHome} size="lg" />
                        <button className="btn home-btn">Home</button>
                    </Link>
                </div>
                <div className="sidebar-btn">
                    <Link className="search-link"
                        to="/search">
                        <FontAwesomeIcon className="search-icon"
                        icon={faSearch} size="lg" />
                        <button className="btn search-btn">Search</button>
                    </Link>
                </div>
                <div className= "streaming-widget">
                    <StreamingWidget />
                </div> */}