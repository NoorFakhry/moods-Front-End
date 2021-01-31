import './DisplayArtistFromSearchResults.css';
import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import {selectAllArtists} from '../../features/searchResults/searchResults';
import {generateArtistPlayBackWidget} from '../../features/playBackWidget/playBackWidget';
import PlayButton from '../PlayButton/PlayButton';


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
                <div className="content-box artist"
                 key = { mainArtist.id } >
                    <img src = { mainArtist.images[1].url } />
                    <h4 className="item-name">{mainArtist.name}</h4>
                    <p className="item-type">Artist</p>
                    <PlayButton onPlayButtonClick={onPlayButton} />
                </div>
            );
        } catch(err) {
            console.log(err);
        }
    }

    return(
        <Fragment>
            {displayArtist()}
        </Fragment>
    );
};

export default DisplayArtistFromSearchResults;