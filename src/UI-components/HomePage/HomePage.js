import React, {Fragment} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {getTracksForCertainAlbum} from '../../features/searchResults/searchResults';
import {selectAllAlbumsNewReleases} from '../../features/recommendations/recommendations';

const HomePage = () => {
    const dispatch = useDispatch();
    // get new album releases from the state
    const newAlbumReleases = useSelector(selectAllAlbumsNewReleases);

    // display those new albums
    const displayNewAlbums = () => {
        let renderedAlbums;
        if(newAlbumReleases) {
            renderedAlbums = newAlbumReleases.map(album => {
                // when the user clicks on certain album
                const onAlbumButtonClick = () => {
                    dispatch(getTracksForCertainAlbum(album.id));
                };
                return (
                        <div key = {album.id}>
                            <img alt = "album thumbnail" src={album.images[1].url}/>
                            <button onClick={onAlbumButtonClick}>
                                <Link to = {`searchResults/album/${album.id}`} > { album.name } </Link>
                            </button>
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