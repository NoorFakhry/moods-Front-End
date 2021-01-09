import React from 'react';

const StreamingWidget = () => {
    return(
        <div>
            <iframe 
            id="streaming-widget"
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

export default StreamingWidget;