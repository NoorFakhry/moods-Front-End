import React from 'react';

const StreamingWidget = () => {
    return(
            <iframe 
            id="streaming-widget"
            className="widget"
            title="widget"  
            frameBorder="0" 
            allowtransparency="true" 
            allow="encrypted-media">
            </iframe>
    )
};

export default StreamingWidget;