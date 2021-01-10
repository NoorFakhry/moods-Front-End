import React, {Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectAllTracks} from '../../features/searchResults/searchResults';
import {generateTrackPlayBackWidget} from '../../features/playBackWidget/playBackWidget';

const DisplayTracksFromSearchResults = () => {

    const dispatch = useDispatch();
    // select all tracks
    const tracks = useSelector( selectAllTracks );

    // check if there are any albums
    const isThereAnyTracksResults = () => {
        if(tracks.length > 0) return true;
    };

    // write "Tracks" heading above Tracks results if there are any Tracks results
    const displayTracksHeading = () => {
        if(isThereAnyTracksResults()) {
            return (
                <h1>Tracks</h1>
            );
        }
    };

    // display tracks
    const displayTracks = tracks.map( track => {
        // when the user clicks on certain track
        const onTrackButtonClick = () => {
            generateTrackPlayBackWidget(track.id);
        };
        return (
                <section key = { track.id } >
                    <h4>
                        { track.name }
                    </h4>
                    <button onClick={onTrackButtonClick}>Play</button>
                </section>
        );
    } );

    const showTracksResults = () => {
        return(
            <section className="container">
                {displayTracksHeading()}
                {displayTracks}
            </section>
        )
    };

    return(
        <Fragment>
            {showTracksResults()}
        </Fragment>
    );
};

export default DisplayTracksFromSearchResults;