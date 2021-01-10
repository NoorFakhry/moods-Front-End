import React from 'react';
import './StreamingWidget.css';

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