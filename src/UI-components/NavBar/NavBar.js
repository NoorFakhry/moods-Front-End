import React, {Fragment, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import {getSearchResults} from '../../features/searchResults/searchResults';

const NavBar = () => {
    // create an inner state for the search input
    // and make it respond to user typing
    const [ searchInput, setSearchInput ] = useState( '' );

    // change inner state
    // and get search results on input change
    const onSearchChange = (e) => {
        setSearchInput( e.target.value );
        dispatch( getSearchResults( searchInput ) );
    }

    // clear search input helper function
    const clearSearchInput = () => {
        setSearchInput('');
    }

    const dispatch = useDispatch();

    // if the user types something in the search input
    // he will be taken to search results page
    const redirectToSearchResults = () => {
        if(searchInput) {
            return <Redirect to="/searchResults"/>     
        }
    }

    return(
        <Fragment>
                <Navbar bg="primary" variant="dark">
                    <Link to="/homePage">
                        <Navbar.Brand onClick={clearSearchInput}>Moods</Navbar.Brand>
                    </Link>
                    <Nav className="mr-auto">
                        <Link to="/BrowsePage" className="browse-link">Browse</Link>
                    </Nav>
                    <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2"
                            onChange = {onSearchChange} />
                            {redirectToSearchResults()}
                    </Form>
                </Navbar>
        </Fragment>
    )
};

export default NavBar;