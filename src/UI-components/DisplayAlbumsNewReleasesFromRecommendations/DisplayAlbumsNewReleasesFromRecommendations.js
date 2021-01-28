import './DisplayAlbumsNewReleasesFromRecommendations.css';
import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {selectAllAlbumsNewReleases, getTracksForCertainAlbumFromAlbumsNewReleases} from '../../features/recommendations/recommendations';
import {generateAlbumPlayBackWidget} from '../../features/playBackWidget/playBackWidget';
import {Link} from 'react-router-dom';
import PlayButton from '../PlayButton/PlayButton';


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
                const onPlayButtonClick = () => {
                    generateAlbumPlayBackWidget(album.id)
                }

                const albumNameLen = () => {
                   if(album.name.length > 12) {
                       return `${album.name.substr(0, 12)}... `
                   } else {
                       return album.name
                   }
                };
                return (
                        <div
                        key = {album.id}>
                            <img 
                            className="item-img"
                            alt = "album thumbnail" 
                            src={album.images[1].url}/>
                            <button className="item-background"
                            onClick={onAlbumButtonClick}>
                                <Link className="item-name"
                                to = {`albumsNewReleases/album/${album.id}`} > { albumNameLen() } </Link>
                            </button>
                            <h5 className="artist-name"
                            > {album.artists[0].name} </h5>
                            <PlayButton onPlayButtonClick={onPlayButtonClick}/>
                        </div>
                )
            });
            return renderedAlbums;
        } 
    };

    return(
        <div className="content recentReleases-container">
            {displayAlbumsNewReleases()}
        </div>
    )

};

export default DisplayAlbumsNewReleasesFromRecommendations;
