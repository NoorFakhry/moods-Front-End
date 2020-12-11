import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import {selectAllAlbums, selectAllArtists, selectAllTracks} from '../../features/searchResults/searchResults';

const DisplaySearchResults = () => {
    // select all albums
    const albums = useSelector( selectAllAlbums );
    // select all artists
    const artists = useSelector( selectAllArtists );
    // get the main artist
    const mainArtist = artists[0];
    // select all tracks
    const tracks = useSelector( selectAllTracks );

    // display artist
    const displayArtist = () => {
        if(mainArtist) {
            return (
                <div key = { mainArtist.id } >
                    <img src = { mainArtist.images[1].url } />
                    <h4>
                        <a href = { mainArtist.external_urls.spotify } > { mainArtist.name } </a>
                    </h4>
                    <p>Artist</p>
                </div>
            );
        };
    }
    
    // display albums
    const displayAlbums = albums.map( album => {
        return (
                <div key = { album.id } >
                    <img src = { album.images[1].url } />
                    <h4>
                        <a href = { album.external_urls.spotify } > { album.name } </a>
                    </h4>
                    <h4> { album.artists[0].name } </h4>
                </div>
        );
    } );
    // display tracks
    const displayTracks = tracks.map( track => {
        return (
                <div key = { track.id } >
                    <h4>
                        <a href = { track.external_urls.spotify } > { track.name } </a>
                    </h4>
                </div>
        );
    } );

    // display all search results
    const displaySearchResults = () => {
        return (
            <Fragment>
                <div className="container">
                {displayArtist()}
                </div>
                <div className="container">
                    {displayAlbums}
                </div>
                <div className="container">
                    {displayTracks}
                </div>
            </Fragment>
        )
    }

    return (
        <Fragment>
            {displaySearchResults()}
        </Fragment>
    )
};

export default DisplaySearchResults;