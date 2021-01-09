import React, {Fragment} from 'react';
import AlbumStreamingWidget from './StreamingWidget';
import PlaylistStreamingWidget from './PlaylistStreamingWidget';
import TrackStreamingWidget from './StreamingWidget';

const StreamingWidgets = () => {
    return (
        <Fragment>
            <AlbumStreamingWidget className="album-widget" />
            <PlaylistStreamingWidget />
            <TrackStreamingWidget />
        </Fragment>
    )
};

export default StreamingWidgets;