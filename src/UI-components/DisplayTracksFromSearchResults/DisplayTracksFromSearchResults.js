import './DisplayTracksFromSearchResults.css';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectAllTracks} from '../../features/searchResults/searchResults';
import {generateTrackPlayBackWidget} from '../../features/playBackWidget/playBackWidget';
import PlayButton from '../PlayButton/PlayButton';

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
                <h1 className="content-header">Tracks</h1>
            );
        }
    };

    // display tracks
    const displayTracks = tracks.map( track => {

        // when the user clicks on certain track
        const onTrackButtonClick = () => {
            generateTrackPlayBackWidget(track.id);
        };

        const trackNameLen = () => {
            if(track.name.length > 12) {
                return `${track.name.substr(0, 60)}... `
            } else {
                return track.name
            }
        };

        return (
                <section className="track-box"
                 key = { track.id } >
                    <h4 className="item-name">
                        { trackNameLen() }
                    </h4>
                    <PlayButton onPlayButtonClick={onTrackButtonClick}/>
                </section>
        );
    } );

    return(
        <div className="tracks">
            <div>
                {displayTracksHeading()}
            </div>
            <div className="tracks-container">
                {displayTracks}
            </div>
        </div>
    );
};

export default DisplayTracksFromSearchResults;