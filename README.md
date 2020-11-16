# Set up spotify

## ---> npm i spotify-web-api-js

## create a spotify file js to access spotify url and get token
    - export const authEndpoint = "https://accounts.spotify.com/en/authorize" 
        --> get the url from spotify developer authentication

    - const redirectUrl = window.location.origin + '/'
        --> redirect from the default localhost (exp: http://localhost:3000)

    - const clientId = 'get from spotify developer dashboard'

    - const scope = [
        'user-read-recently-played',
        'user-read-plauback-state',
        'user-modify-playback-state',
        'user-read-currently-playing',
        'user-top-read'
    ]
        --> to get detail about these scope, read from https://developer.spotify.com/documentation/general/guides/scopes/

    - export const loginUrl = `the format based on URL get Web Playback SDK Access Token`

    - export const getAccessTokenFormUrl = () => {
        return window.location.hash
            .substring(1)
            .split('&')
            .reduce((initial,item)=>{
                let parts = item.split('=');
                initial[parts[0]] = decodeURIComponent(part[1]);
                return initial
            }, {})
    }

## Login to Spotify to get token later on. In login.js
    - import {loginUrl} from "./spotify"
    - button "Login" has href={loginUrl}

## Get token to access, get information : token, user, playlist. Keep track token just into a variable in ContextAPI file, called is token. In app.js
    - import SpotifyWebApi from 'spotify-web-api-js'
    - import {getAccessTokenFromUrl} from './spotify.js'
    - const spotify = new SpotifyWebApi()
    - useEffect(()=>{
        const hash = getAccessTokenFromUrl()
        window.location.hash = " ";
        const _token = hash["access_token"]
        if(_token){
            --> keep track token in datalayer

            - spotify.setAccessToken(_token);
                --> access into spotify

            - spotify.getMe().then((user)=>{keep track user into datalayer})
                --> get user info

            spotify.getUserPlaylist().then((playlists)=>{keep track playlists into datalayer})
                --> get user playlist
        }
    })



