// generate and display playBack widget for any album
export const generateAlbumPlayBackWidget = (albumId) => {
    document.getElementById('playback-widget').setAttribute('src', `https://open.spotify.com/embed/album/${albumId}`);
};

// generate and display playBack widget for any track
export const generateTrackPlayBackWidget = (trackId) => {
    document.getElementById('playback-widget').setAttribute('src', `https://open.spotify.com/embed/track/${trackId}`);
};