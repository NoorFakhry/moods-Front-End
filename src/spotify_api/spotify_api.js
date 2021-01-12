// functions that get data from spotify
// ====================================

import {accessToken} from '../tokens/tokens';

// create async function that returns the search results for the user
export const getSearchResults = async (input) => {
  const url = `https://api.spotify.com/v1/search?q=${input}&type=album%2Cartist%2Ctrack%2Cplaylist&limit=50&offset=0`;
    const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  return data;
};

// create async function that returns any album tracks if the user press on certain album
export const getTracksForCertainAlbum = async (albumId) => {
  const albumUrl = `https://api.spotify.com/v1/albums/${albumId}/tracks?limit=50&offset=0`;
    const response = await fetch(albumUrl,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
    } );
    const tracksForThisAlbum = await response.json();
    tracksForThisAlbum.id = albumId;
    console.log(tracksForThisAlbum);
    return tracksForThisAlbum;
};

// create async function that returns albums new releases 
export const getNewAlbumsReleases = async () => {
  const url = 'https://api.spotify.com/v1/browse/new-releases?limit=50&offset=5';
    const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    return data.albums.items;
};

//fetch('http://localhost:8888/refreshToken').then(res => res.json()).then(data => console.log(data.accessToken))
