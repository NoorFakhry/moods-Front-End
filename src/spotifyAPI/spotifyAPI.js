import * as SpotifyApi from 'spotify-web-api-js';
import {accessToken, /*refreshToken*/} from '../tokens/tokens'
const spotify = new SpotifyApi();
spotify.setAccessToken(accessToken);

export default spotify;
