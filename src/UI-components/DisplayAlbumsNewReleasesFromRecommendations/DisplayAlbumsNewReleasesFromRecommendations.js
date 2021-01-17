import React, {Fragment} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {selectAllAlbumsNewReleases, getTracksForCertainAlbumFromAlbumsNewReleases} from '../../features/recommendations/recommendations';
import {Link} from 'react-router-dom';

const DisplayAlbumsNewReleasesFromRecommendations = () => {

    const dispatch = useDispatch();
    // get new album releases from the state
    const newAlbumReleases = useSelector(selectAllAlbumsNewReleases);

    // display those new albums
    const displayAlbumsNewReleases = () => {
        let renderedAlbums;
        if(newAlbumReleases) {
            renderedAlbums = newAlbumReleases.map(album => {
                // when the user clicks on certain album
                const onAlbumButtonClick = () => {
                    dispatch(getTracksForCertainAlbumFromAlbumsNewReleases(album.id));
                };
                return (
                        <div key = {album.id}>
                            <img alt = "album thumbnail" src={album.images[1].url}/>
                            <button onClick={onAlbumButtonClick}>
                                <Link to = {`albumsNewReleases/album/${album.id}`} > { album.name } </Link>
                            </button>
                            <h5> {album.artists[0].name} </h5>
                        </div>
                )
            });
            return renderedAlbums;
        } 
    };

    const isThereAnyNewAlumsReleases = () => {
        if(newAlbumReleases.length > 0) {return true};
    };

    const displayNewReleasesHeading = () => {
        if(isThereAnyNewAlumsReleases()) {
            return(
                <div>
                    <h1>New Releases</h1>
                </div>
            )
        }
    };

    const showAlbumsNewReleases = () => {
        return (
            <Fragment>
                {displayNewReleasesHeading()}
                {displayAlbumsNewReleases()}
            </Fragment>
        )
    };

    return(
        <Fragment>
            {showAlbumsNewReleases()}
        </Fragment>
    )

};

export default DisplayAlbumsNewReleasesFromRecommendations;
