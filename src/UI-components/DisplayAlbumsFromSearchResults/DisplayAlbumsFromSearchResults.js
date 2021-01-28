import React, {Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectAllAlbums ,getTracksForCertainAlbumFromSearchResults} from '../../features/searchResults/searchResults';
import {Link} from 'react-router-dom';

const DisplayAlbumsFromSearchResults = () => {

    const dispatch = useDispatch();
    // select all albums
    const albums = useSelector( selectAllAlbums );

    // check if there are any albums
    const isThereAnyAlbumResults = () => {
        if(albums.length > 0) return true;
    };

    // write "Albums" heading above albums results if there are any albums results
    const displayAlbumsHeading = () => {
        if(isThereAnyAlbumResults()) {
            return (
                <div className="headers-container grid-container">
                    <h1 className="headers grid-item">Albums</h1>
                </div>
            );
        }
    };

    // display albums
    const displayAlbums = albums.map( album => {
        // when the user clicks on certain album
        const onAlbumButtonClick = () => {
            dispatch(getTracksForCertainAlbumFromSearchResults(album.id));
        };
        try{
            return (
                <section className="grid-item" 
                key = { album.id } >
                    <img src = { album.images[1].url } />
                    <h4>
                        <button onClick={onAlbumButtonClick}>
                            <Link to = {`searchResults/album/${album.id}`} > { album.name } </Link>
                        </button>
                    </h4>
                    <h4> { album.artists[0].name } </h4>
                </section>
        );
        } catch(err) {
            console.log(err);
        }
    } );

    const showAlbumsResults = () => {
        return(
            <section className="container">
                {displayAlbumsHeading()}
                <div className="grid-container">
                    {displayAlbums}
                </div>
            </section>
        )
    };

    return(
        <Fragment>
            {showAlbumsResults()}
        </Fragment>
    );
};

export default DisplayAlbumsFromSearchResults;