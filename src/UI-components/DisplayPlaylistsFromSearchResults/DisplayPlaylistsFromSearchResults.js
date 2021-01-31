import React, {Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectAllPlaylists} from '../../features/searchResults/searchResults';
import {generatePlaylistPlayBackWidget} from '../../features/playBackWidget/playBackWidget';
import PlayButton from '../PlayButton/PlayButton';

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
                <h1 className="content-header">Playlists</h1>
            );
        }
    };

    // display playlists
    const displayPlaylists = playlists.map( playlist => {
        // when the user clicks on certain playlist
        const onPlaylistButtonClick = () => {
            generatePlaylistPlayBackWidget(playlist.id);
        };
        
        const playlistNameLen = () => {
            if(playlist.name.length > 12) {
                return `${playlist.name.substr(0, 12)}... `
            } else {
                return playlist.name
            }
        }

        try{
            return (
                <section className="content-box"
                 key = { playlist.id } >
                    <img src = { playlist.images[1].url } />
                    <h1  className="item-name">{playlistNameLen()}</h1>
                    <span className="item-total">{playlist.tracks.total} Tracks</span>
                    <PlayButton onPlayButtonClick={onPlaylistButtonClick}/>
                </section>
        );
        } catch(err) {
            console.log(err);
        }
    } );    

    return(
            <div className="playlists">
                <div>
                    {displayPlaylistsHeading()}
                </div>
                <div className="responsive-container">
                    {displayPlaylists}
                </div>
            </div>
    );
};

export default DisplayPlayListsFromSearchResults;