import React from 'react';
import {useSelector} from 'react-redux';
import {selectAllAlbumsNewReleases} from '../../../features/recommendations/recommendations';

const RecentReleasesHeader = () => {

    // get new album releases from the state
    const newAlbumReleases = useSelector(selectAllAlbumsNewReleases);

    const isThereAnyNewAlumsReleases = () => {
        if(newAlbumReleases.length > 0) {return true};
    };

    const displayNewReleasesHeading = () => {
        if(isThereAnyNewAlumsReleases()) {
            return(
                <h1 className="content-header">Recent Releases</h1>
            )
        }
    };

    return (
        <div className="header">
            {displayNewReleasesHeading()}
        </div>
    )
}

export default RecentReleasesHeader;