import React, {Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectAllArtists} from '../../features/searchResults/searchResults';
import Button from '@material-ui/core/Button';
import {generateArtistPlayBackWidget} from '../../features/playBackWidget/playBackWidget';


const DisplayArtistFromSearchResults = () => {

    const dispatch = useDispatch();
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
                <div key = { mainArtist.id } >
                    <img src = { mainArtist.images[1].url } />
                    <h4>{mainArtist.name}</h4>
                    <p>Artist</p>
                    <Button variant="contained" color="secondary"
                    onClick={onPlayButton}
                    >Play</Button>
                </div>
            );
        } catch(err) {
            console.log(err);
        }
    }

    const showArtistResults = () => {
        return(
            <section className="container">
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