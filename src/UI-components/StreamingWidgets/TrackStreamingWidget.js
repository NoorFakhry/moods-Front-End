import React from 'react';

const TrackStreamingWidget = () => {
    return(
        <div>
            <iframe 
            id="track-widget"
            title="widget"  
            width="300" 
            height="380" 
            frameBorder="0" 
            allowtransparency="true" 
            allow="encrypted-media">
            </iframe>
        </div>
    )
};

export default TrackStreamingWidget;