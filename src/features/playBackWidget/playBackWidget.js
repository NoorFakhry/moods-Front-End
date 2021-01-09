// generate and display playBack widget for any album
export const generateAlbumPlayBackWidget = (albumId) => {
    document.getElementById('streaming-widget').setAttribute('src', `https://open.spotify.com/embed/album/${albumId}`);
};

// generate and display playBack widget for any playlist
export const generatePlaylistPlayBackWidget = (playlistId) => {
    document.getElementById('streaming-widget').setAttribute('src', `https://open.spotify.com/embed/playlist/${playlistId}`);
};

// generate and display playBack widget for any track
export const generateTrackPlayBackWidget = (trackId) => {
    document.getElementById('streaming-widget').setAttribute('src', `https://open.spotify.com/embed/track/${trackId}`);
};