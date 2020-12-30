import React from 'react';

const AlbumStreamingWidget = () => {
    return(
        <div>
            <iframe 
            id="album-widget"
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

export default AlbumStreamingWidget;