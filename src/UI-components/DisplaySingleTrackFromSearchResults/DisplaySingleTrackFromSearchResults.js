import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {selectTrackById} from '../../features/searchResults/searchResults';

const DisplaySingleTrackFromSearchResults = () => {
    const params = useParams();
    // extract the track id
    const {trackId} = params;
    // select the track from search results
    const track = useSelector((state) => {
        return selectTrackById(state, trackId);
    });
    console.log('Track =>', track)
    return (<Fragment></Fragment>)
};

export default DisplaySingleTrackFromSearchResults;