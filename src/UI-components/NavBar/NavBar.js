import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import StreamingWidget from '../StreamingWidget/StreamingWidget';


const NavBar = () => {

    return(
        <Fragment>
                <div className="sidenav">
                    <div className="sidebar-btn">
                        <Link to="/homePage">
                            <HomeIcon className="icon"/>
                            <Button variant="contained" color="primary">Home</Button>
                        </Link>
                    </div>
                    <div className="sidebar-btn">
                        <Link to="/search">
                            <SearchIcon className="icon"/>
                            <Button variant="contained" color="secondary">Search</Button>
                        </Link>
                    </div>
                    <div className= "streaming-widget">
                        <StreamingWidget />
                    </div>
                </div>
        </Fragment>
    )
};

export default NavBar;