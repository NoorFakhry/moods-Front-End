// this helper function will obtain the access token for the very first time
// from the hash of the url
// after the user gets redirected from the spotify accounts
const getTokens = () => {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
        }
    return hashParams;
};

// save the tokens
const tokens = getTokens();

export const token = tokens.accessToken;