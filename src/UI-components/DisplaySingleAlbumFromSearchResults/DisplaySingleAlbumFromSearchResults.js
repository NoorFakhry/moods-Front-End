import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {selectAlbumById} from '../../features/searchResults/searchResults';
import {generateAlbumPlayBackWidget,generateTrackPlayBackWidget} from '../../features/playBackWidget/playBackWidget';
import PlayButton from '../PlayButton/PlayButton';


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

    // Display the tracks of the album
    const displayTracks = () => {

        let tracks;
        try {
            tracks = album.tracks.map(track => {
                // when the user clicks on certain track
                const onTrackButtonClick = () => {
                    generateTrackPlayBackWidget(track.id);
                };
                return (
                    <div className="">
                        <h5 className="item-name">{track.name}</h5>
                        <PlayButton onPlayButtonClick={onTrackButtonClick}/>
                    </div>
                )
            });
        } catch(err) {console.log(err)};

        return tracks
    };

    // Display the album
    const displayAlbum = () => {
        const onPlayButtonClick = () => {
            generateAlbumPlayBackWidget(album.id)
        }
        return (
            <div className="content-box">
                <img className="item-img"
                src={albumImage}/>
                <h1 className="item-name">{albumName}</h1>
                <h1 className="artist-name">{albumArtist}</h1>
                <PlayButton onPlayButtonClick={onPlayButtonClick}/>
            </div>
        )
    };
    return (
        <Fragment>
            {displayAlbum()}
            <div className="responsive-container">
                    {displayTracks()}
            </div>
        </Fragment>
    )
};

export default DisplaySingleAlbumFromSearchResults;