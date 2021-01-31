import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectAllAlbums ,getTracksForCertainAlbumFromSearchResults} from '../../features/searchResults/searchResults';
import {Link} from 'react-router-dom';
import PlayButton from '../PlayButton/PlayButton';
import {generateAlbumPlayBackWidget} from '../../features/playBackWidget/playBackWidget';


const DisplayAlbumsFromSearchResults = () => {

    const dispatch = useDispatch();
    // select all albums
    const albums = useSelector( selectAllAlbums );

    // check if there are any albums
    const isThereAnyAlbumResults = () => {
        if(albums.length > 0) return true;
    };

    // write "Albums" heading above albums results if there are any albums results
    const displayAlbumsHeading = () => {
        if(isThereAnyAlbumResults()) {
            return (
                    <h1 className="content-header">Albums</h1>
            );
        }
    };

    // display albums
    const displayAlbums = albums.map( album => {

        // generate widget to play full album
        const onPlayButtonClick = () => {
            generateAlbumPlayBackWidget(album.id);
        }

        // when the user clicks on certain album
        const onAlbumButtonClick = () => {
            dispatch(getTracksForCertainAlbumFromSearchResults(album.id));
        };

        const albumNameLen = () => {
            if(album.name.length > 12) {
                return `${album.name.substr(0, 12)}... `
            } else {
                return album.name
            }
         };
        try{
            return (
                <div className="content-box"
                key = { album.id } >
                    <img src = { album.images[1].url } />
                    <h4>
                        <button className="item-background"
                         onClick={onAlbumButtonClick}>
                            <Link className="item-name"
                             to = {`searchResults/album/${album.id}`} > { albumNameLen() } </Link>
                        </button>
                    </h4>
                    <h4 className="artist-name"> { album.artists[0].name } </h4>
                    <PlayButton onPlayButtonClick={onPlayButtonClick} />
                </div>
        );
        } catch(err) {
            console.log(err);
        }
    } );

    return(
        <div className="albums">
            <div>
                {displayAlbumsHeading()}
            </div>
            <div className="responsive-container">
                {displayAlbums}
            </div>
        </div>
    );
};

export default DisplayAlbumsFromSearchResults;