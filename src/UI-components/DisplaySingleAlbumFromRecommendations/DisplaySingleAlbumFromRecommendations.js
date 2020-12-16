import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {selectAlbumByIdFromRecommendations} from '../../features/recommendations/recommendations';


const DisplaySingleAlbumFromRecommendations = () => {
    const params = useParams();
    // extract the album id
    const {albumId} = params;
    // select the album from recommendations
    const album = useSelector((state) => {
        return selectAlbumByIdFromRecommendations(state, albumId);
    });
    console.log('ALbum from recomm =>', album)
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
                return (<h5>{track.name}</h5>)
            });
        } catch(err) {console.log(err)};

        return tracks
    };

    // function that will display the album
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
        </Fragment>
    )
};

export default DisplaySingleAlbumFromRecommendations;