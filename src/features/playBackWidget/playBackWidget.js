// generate and display playBack widget for any album
export const generateAlbumPlayBackWidget = (albumId) => {
    document.getElementById('album-widget').setAttribute('src', `https://open.spotify.com/embed/album/${albumId}`);
};

// remove album playBack widget
export const removeALbumPlayBackWidget = () => {
    document.getElementById('album-widget').setAttribute('src', '');
};

// generate and display playBack widget for any track
export const generateTrackPlayBackWidget = (trackId) => {
    document.getElementById('track-widget').setAttribute('src', `https://open.spotify.com/embed/track/${trackId}`);
};

// remove track playBack widget
export const removeTrackPlayBackWidget = () => {
    document.getElementById('track-widget').setAttribute('src', '');
};