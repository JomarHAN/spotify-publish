export const initialState = {
    token: null,
    user: null,
    playlists: [],
    current_playlist: null,
    tracks: null,
    track: null,
    popup: false
}

const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case "SET_POPUP":
            return {
                ...state,
                popup: action.popup
            }

        case "SET_TOKEN":
            return {
                ...state,
                token: action.token
            }

        case "SET_USER":
            return {
                ...state,
                user: action.user
            }

        case "SET_PLAYLISTS":
            return {
                ...state,
                playlists: action.playlists
            }

        case "SET_CURRENT_PLAYLIST":
            let rawList = null;
            state.playlists.items.forEach(playlist => {
                if (playlist.id === action.id) {
                    rawList = playlist
                }
            })
            return {
                ...state,
                current_playlist: rawList
            }

        case "SET_TRACKS":
            return {
                ...state,
                tracks: action.tracks
            }

        case "SET_TRACK":
            return {
                ...state,
                track: action.track
            }

        default:
            return state
    }
}

export default reducer;