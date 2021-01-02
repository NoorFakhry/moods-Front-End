import React from 'react';

const PlaylistStreamingWidget = () => {
    return(
        <div>
            <iframe 
            id="playlist-widget"
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

export default PlaylistStreamingWidget;