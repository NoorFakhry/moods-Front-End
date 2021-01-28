import './DisplayArtistFromSearchResults.css';
import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import {selectAllArtists} from '../../features/searchResults/searchResults';
import {generateArtistPlayBackWidget} from '../../features/playBackWidget/playBackWidget';

const DisplayArtistFromSearchResults = () => {

    // select all playlists
    const artists = useSelector( selectAllArtists );
    // get the main artist
    let mainArtist;
    if(artists.length > 0) {
        mainArtist = artists[0];
    };

    const onPlayButton = () => {
        generateArtistPlayBackWidget(mainArtist.id);
    };
    
    // display artist
    const displayArtist = () => {
        try {
            return (
                <div className="searchresults-item"
                 key = { mainArtist.id } >
                    <img src = { mainArtist.images[1].url } />
                    <h4 >{mainArtist.name}</h4>
                    <p >Artist</p>
                    <button className="btn"
                     onClick={onPlayButton}>Play</button>
                </div>
            );
        } catch(err) {
            console.log(err);
        }
    }

    const showArtistResults = () => {
        return(
            <section>
                {displayArtist()}
            </section>
        )
    };

    return(
        <Fragment>
            {showArtistResults()}
        </Fragment>
    );
};

export default DisplayArtistFromSearchResults;