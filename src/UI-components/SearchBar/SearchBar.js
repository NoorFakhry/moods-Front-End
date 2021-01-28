import './SearchBar.css';
import React, {Fragment,useState} from 'react';
import {useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {getSearchResultsWhileSearching, changeSearchInputLength, changeSearchInputValue} from '../../features/searchResults/searchResults';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchBar = () => {

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
            return <Redirect to={`/search/${searchInput}`}/>
        }
    }
    return(
        <Fragment>
                <div className="searchbar">
                    <FontAwesomeIcon icon={faSearch} size="lg" />
                    <input className="searchinput"
                    type="text" 
                    placeholder="Search"
                    onInput={onSearchChange}
                    ></input>
                </div>
               {redirectToSearchResults()}
        </Fragment>
    )
};

export default SearchBar;