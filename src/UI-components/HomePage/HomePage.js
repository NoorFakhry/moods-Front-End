import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import {selectAllAlbumsNewReleases} from '../../features/recommendations/recommendations';

const HomePage = () => {
    // get new album releases from the state
    const newAlbumReleases = useSelector(selectAllAlbumsNewReleases);

    // display those new albums
    const displayNewAlbums = () => {
        let renderedAlbums;
        if(newAlbumReleases) {
            renderedAlbums = newAlbumReleases.map(album => {
                return (
                        <div key = {album.id}>
                            <img alt = "album thumbnail" src={album.images[1].url}/>
                            <a href = {album.external_urls.spotify}>
                                <h1> {album.name} </h1>
                            </a>
                            <h5> {album.artists[0].name} </h5>
                        </div>
                )
            });
            return renderedAlbums;
        } else {
            return <h1>Loading New Albums</h1>
        }  
    };

    return (
        <Fragment>
            <h1>New Releases</h1>
            <div className="container">
                {displayNewAlbums()}
            </div>
        </Fragment>
    )
};

export default HomePage;