import React, {Fragment, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import {getSearchResultsWhileSearching, changeSearchInputLength, changeSearchInputValue} from '../../features/searchResults/searchResults';

const NavBar = () => {
    const dispatch = useDispatch();

    // create an inner state for the search input
    // and make it respond to user typing
    const [ searchInput, setSearchInput ] = useState( '' );

    // change inner state
    // and get search results on input change
    const onSearchChange = (e) => {
        setSearchInput( escape(e.target.value) );
        dispatch( getSearchResultsWhileSearching( searchInput ) );
    }

    dispatch(changeSearchInputLength(searchInput.length));
    dispatch(changeSearchInputValue(searchInput));

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
                        <Navbar.Brand>Moods</Navbar.Brand>
                    </Link>
                    <Nav className="mr-auto">
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