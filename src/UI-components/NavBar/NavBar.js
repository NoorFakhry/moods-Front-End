import React, {Fragment, useState} from 'react';
import {useDispatch} from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import {getSearchResults} from '../../features/searchResults';

const NavBar = () => {
    // create an inner state for the search input
    // and make it respond to user typing
    const [ searchInput, setSearchInput ] = useState( '' );
    const onSearchChange = e => setSearchInput( e.target.value );
    const dispatch = useDispatch();
    const onSearchButtonClick = () => {
        if( searchInput ) {
            dispatch( getSearchResults( searchInput ) )
        }
        //setSearchInput( '' )
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
                    <Button variant="outline-light"
                    onClick = {onSearchButtonClick}
                    >Search</Button>
                </Form>
            </Navbar>
        </Fragment>
    )
};

export default NavBar;