import React, {Fragment, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, Redirect, Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import DisplaySearchResults from '../DisplaySearchResults/DisplaySearchResults';
import {getSearchResults} from '../../features/searchResults/searchResults';

const NavBar = () => {
    // create an inner state for the search input
    // and make it respond to user typing
    const [ searchInput, setSearchInput ] = useState( '' );
    const onSearchChange = (e) => {
        setSearchInput( e.target.value );
        dispatch( getSearchResults( searchInput ) );
    }
    const dispatch = useDispatch();
    const onSearchButtonClick = () => {
        if( searchInput ) {
            dispatch( getSearchResults( searchInput ) )
        }
    }
    // link to searchResults page if the user enters something as input
    const linkToSearchResults = () => {
        if(searchInput) {
            return <Link to="/searchResults">
                        <Button variant="outline-light"
                            onClick = {onSearchButtonClick}
                        > Search
                        </Button>
                    </Link>
        } else {
            return <Button variant="outline-light"
                    >Search
                    </Button>
        }
    }

    const redirectToSearchResults = () => {
        if(searchInput) {
            return <Redirect to="/searchResults"/>
                
        }
    }

    return(
        <Fragment>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="#home">Moods</Navbar.Brand>
                    <Nav className="mr-auto">
                    </Nav>
                    <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2"
                            onChange = {onSearchChange} />
                            {linkToSearchResults()}
                            {redirectToSearchResults()}
                    </Form>
                </Navbar>
        </Fragment>
    )
};

export default NavBar;