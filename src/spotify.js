export const authEndpoint = "https://accounts.spotify.com/en/authorize"

const redirectUrl = window.location.origin + '/';

const clientId = '3ff019c173c443e09a7f8eddaa2f726a'

const scope = [
    "user-read-recently-played",
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-top-read',
];

export const loginUrl = `${authEndpoint}?response_type=token&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join('%20')}&show_dialog=true`;

export const getAccessTokenUrl = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            let parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
            return initial
        }, {})
}