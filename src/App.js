import "./App.css";
import Player from "./Player/Player";
import SpotifyWebApi from "spotify-web-api-js";
import { useEffect } from "react";
import { getAccessTokenUrl } from "./spotify";
import { useDataLayerValue } from "./data/dataLayer";
import Login from "./Login/Login";

const spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getAccessTokenUrl();
    window.location.hash = " ";
    const _token = hash["access_token"];

    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.setAccessToken(_token);

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });
    }
  }, []);
  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
