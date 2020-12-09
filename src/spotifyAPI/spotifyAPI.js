import SpotifyWebApi from 'spotify-web-api-js';
import {accessToken, /*refreshToken*/} from '../tokens/tokens'
const spotify = new SpotifyWebApi();
spotify.setAccessToken(accessToken);

export default spotify;
