import React, {Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectAllArtists} from '../../features/searchResults/searchResults';


const DisplayArtistFromSearchResults = () => {

    const dispatch = useDispatch();
    // select all playlists
    const artists = useSelector( selectAllArtists );
    // get the main artist
    let mainArtist;
    if(artists.length > 0) {
        mainArtist = artists[0];
    };
    
    // display artist
    const displayArtist = () => {
        try {
            return (
                <div key = { mainArtist.id } >
                    <img src = { mainArtist.images[1].url } />
                    <h4>{mainArtist.name}</h4>
                    <p>Artist</p>
                </div>
            );
        } catch(err) {
            console.log(err);
        }
    }

    const showPlaylistsResults = () => {
        return(
            <section className="container">
                {displayArtist()}
            </section>
        )
    };

    return(
        <Fragment>
            {showPlaylistsResults()}
        </Fragment>
    );
};

export default DisplayArtistFromSearchResults;