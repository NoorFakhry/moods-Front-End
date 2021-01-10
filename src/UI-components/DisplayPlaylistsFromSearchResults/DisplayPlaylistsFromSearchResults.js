import React, {Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectAllPlaylists} from '../../features/searchResults/searchResults';
import {generatePlaylistPlayBackWidget} from '../../features/playBackWidget/playBackWidget';


const DisplayPlayListsFromSearchResults = () => {

    const dispatch = useDispatch();
    // select all playlists
    const playlists = useSelector( selectAllPlaylists );

    // check if there are any playlists
    const isThereAnyPlaylistsResults = () => {
        if(playlists.length > 0) return true;
    };

    // write "Playlists" heading above playlists results if there are any playlists results
    const displayPlaylistsHeading = () => {
        if(isThereAnyPlaylistsResults()) {
            return (
                <h1>Playlists</h1>
            );
        }
    };

    // display playlists
    const displayPlaylists = playlists.map( playlist => {
        // when the user clicks on certain playlist
        const onPlaylistButtonClick = () => {
            generatePlaylistPlayBackWidget(playlist.id);
        };
        try{
            return (
                <section key = { playlist.id } >
                    <img src = { playlist.images[0].url } />
                    <h1>{playlist.name}</h1>
                    <span>{playlist.tracks.total} Tracks</span>
                    <div>
                        <button onClick={onPlaylistButtonClick}>Play</button>
                    </div>
                </section>
        );
        } catch(err) {
            console.log(err);
        }
    } );    

    const showPlaylistsResults = () => {
        return(
            <section className="container">
                {displayPlaylistsHeading()}
                {displayPlaylists}
            </section>
        )
    };

    return(
        <Fragment>
            {showPlaylistsResults()}
        </Fragment>
    );
};

export default DisplayPlayListsFromSearchResults;