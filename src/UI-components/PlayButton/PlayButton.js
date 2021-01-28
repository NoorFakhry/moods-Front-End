import './PlayButton.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

const PlayButton = (props) => {
    const {onPlayButtonClick} = props;
    return(
        <button onClick={onPlayButtonClick}
                class="btn play-btn">
                <FontAwesomeIcon icon={faPlay} color="#77de88" />
        </button> 
    )
}

export default PlayButton;