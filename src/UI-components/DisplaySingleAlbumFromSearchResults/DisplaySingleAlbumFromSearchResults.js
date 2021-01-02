import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {selectAlbumById} from '../../features/searchResults/searchResults';
import {generateAlbumPlayBackWidget, removeTrackPlayBackWidget,generateTrackPlayBackWidget, removeALbumPlayBackWidget, generatePlaylistPlayBackWidget, removePlaylistPlayBackWidget} from '../../features/playBackWidget/playBackWidget';


const DisplaySingleAlbumFromSearchResults = () => {
    const params = useParams();
    // extract the album id
    const {albumId} = params;
    // select the album from search results
    const album = useSelector((state) => {
        return selectAlbumById(state, albumId);
    });
    // select the name of the artist that will be displayed
    let albumArtist;
    try {
        albumArtist = album.artists[0].name
    } catch(err){console.log(err)};
    // select the image that will be displayed
    let albumImage;
    try {
        albumImage = album.images[1].url;
    } catch(err) {console.log(err)};
    // select the name of the album that will be displayed
    let albumName;
    try {
        albumName = album.name;
    } catch(err) {console.log(err)};

    // when the user click on play full album button
    // the album widget will be displayed 
    // and current track widget will be removed
    const onPlayFullAlbumButtonClick = () => {
        generateAlbumPlayBackWidget(albumId);
        removeTrackPlayBackWidget();
        removePlaylistPlayBackWidget();
    };

    // Display the tracks of the album
    const displayTracks = () => {
        let tracks;
        try {
            tracks = album.tracks.map(track => {
                // when the user clicks on certain track
                const onTrackButtonClick = () => {
                    generateTrackPlayBackWidget(track.id);
                    removeALbumPlayBackWidget();
                    removePlaylistPlayBackWidget();
                };
                return (
                    <div>
                        <h5>{track.name}</h5>
                        <button onClick={onTrackButtonClick}>Play</button>
                    </div>
                )
            });
        } catch(err) {console.log(err)};

        return tracks
    };

    // Display the album
    const displayAlbum = () => {
        return (
            <div>
                <img src={albumImage}/>
                <h1>{albumArtist}</h1>
                <h1>{albumName}</h1>
                <div className="container">
                    {displayTracks()}
                </div>
            </div>
        )
    };
    return (
        <Fragment>
            {displayAlbum()}
            <div className="container">
                <button onClick={onPlayFullAlbumButtonClick}>Play Full Album</button>
            </div>
        </Fragment>
    )
};

export default DisplaySingleAlbumFromSearchResults;