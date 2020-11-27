// this helper function will obtain the tokens
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
// initialize access and refresh token variables
export let accessToken;
export let refreshToken;

// if there are new tokens
// store them in the local storage
if(tokens.accessToken) {
    localStorage.setItem('accessToken',tokens.accessToken );
};

if(tokens.refreshToken) {
    localStorage.setItem('refreshToken',tokens.refreshToken );
};

// assign the access and refresh token variables
// to the tokens from local storage
accessToken = localStorage.getItem('accessToken');
refreshToken = localStorage.getItem('refreshToken');