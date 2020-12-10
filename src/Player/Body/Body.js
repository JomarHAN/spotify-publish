import {
  Favorite,
  MoreHoriz,
  PauseCircleFilled,
  PlayCircleFilled,
} from "@material-ui/icons";
import React from "react";
import { useDataLayerValue } from "../../data/dataLayer";
import { useSoundLayerValue } from "../../data/soundLayer";
import "./Body.css";
import Header from "./children/Header";
import SongRow from "./children/SongRow";
function Body() {
  const [{ current_playlist, tracks, track }] = useDataLayerValue();
  const [{ playing, volume }, soundDispatch] = useSoundLayerValue();

  const handlePlay = () => {
    soundDispatch({
      type: "SET_PLAYING",
      playing: true,
    });

    soundDispatch({
      type: "SET_VOLUME",
      volume: volume / 100,
    });
  };

  const handleStop = () => {
    soundDispatch({
      type: "SET_PLAYING",
      playing: false,
    });
  };
  return (
    <div className="body">
      <div className="body__header">
        <Header />
      </div>
      <div className="body__info">
        <div className="body__infoChild">
          <img
            src={
              current_playlist
                ? current_playlist.images[0].url
                : "https://cdn.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_250/https://www.hypebot.com/wp-content/uploads/2020/07/discover-weekly-250x250.png"
            }
            alt=""
          />
          <div className="body__infoText">
            <strong>PLAYLIST</strong>
            <h2>{current_playlist?.name}</h2>
            <p>{current_playlist?.description}</p>
          </div>
        </div>
      </div>
      <div className="body__songs">
        <div className="body__icons">
          <div className="body__iconsChild">
            {playing ? (
              <PauseCircleFilled
                className="body__shuffle"
                onClick={track ? handleStop : null}
              />
            ) : (
              <PlayCircleFilled
                className="body__shuffle"
                onClick={track ? handlePlay : null}
              />
            )}
            <Favorite />
            <MoreHoriz />
          </div>
        </div>
        <div className="body__child">
          {tracks?.items?.map((track) => (
            <SongRow
              key={track.track.id}
              id={track.track.id}
              track={track.track}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Body;
