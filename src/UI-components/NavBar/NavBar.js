import React, {Fragment, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import {getSearchResults} from '../../features/searchResults/searchResults';

const NavBar = () => {
    // create an inner state for the search input
    // and make it respond to user typing
    const [ searchInput, setSearchInput ] = useState( '' );
    // change the searchInput state to whatever the user is entering
    const onSearchChange = e => setSearchInput( e.target.value );
    // useDispatch middleware
    // which will allow dispatching actions to the store
    const dispatch = useDispatch();
    // when the user press the search button
    // check if there is something in the search input
    // then fetch the data from spotify
    const onSearchButtonClick = () => {
        if( searchInput ) {
            dispatch( getSearchResults( searchInput ) )
        }
    }
    // create the search button
    // checks if the user entered something in search input
    // if he did
    // link to searchResults page after he press the search button
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

    return(
        <Fragment>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand>Moods</Navbar.Brand>
                <Nav className="mr-auto">
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2"
                    onChange = {onSearchChange} />
                    {linkToSearchResults()}
                </Form>
            </Navbar>
        </Fragment>
    )
};

export default NavBar;