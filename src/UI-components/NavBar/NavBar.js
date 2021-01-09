import React, {Fragment, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {getSearchResultsWhileSearching, changeSearchInputLength, changeSearchInputValue} from '../../features/searchResults/searchResults';
import StreamingWidgets from '../StreamingWidget/StreamingWidgets';

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
    };
    
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
                <div class="sidenav">
                    <div>
                        <Button variant="primary">Home</Button>
                    </div>
                    <div>
                        <Button variant="danger">Search</Button>
                    </div>
                    <StreamingWidgets/>
                </div>
        </Fragment>
    )
};

export default NavBar;