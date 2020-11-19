import React from "react";
import { useDataLayerValue } from "../../../data/dataLayer";
import { useSoundLayerValue } from "../../../data/soundLayer";
import "./SongRow.css";

function SongRow({ id, track }) {
  const [{}, dispatch] = useDataLayerValue();
  const [{ playing, repeat }, soundDispatch] = useSoundLayerValue();

  const changeTrack = () => {
    dispatch({
      type: "SET_TRACK",
      track: track,
    });

    let isPlaying = playing;

    soundDispatch({
      type: "SET_PLAYING",
      playing: false,
    });

    let audio = new Audio(track?.preview_url);
    audio.loop = repeat;

    soundDispatch({
      type: "SET_ISRANDOM",
      isRandom: false,
    });

    soundDispatch({
      type: "SET_AUDIO",
      audio: audio,
    });

    if (!isPlaying) {
      soundDispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }

    document.title = `${track?.name} - ${track?.artists[0]?.name}`;
  };
  return (
    <div className="songRow" onClick={() => changeTrack()}>
      <img
        src={track?.album?.images[0]?.url}
        alt=""
        className="songRow__album"
      />
      <div className="songRow__info">
        <h1>{track?.name}</h1>
        <p>{track?.artists[0]?.name}</p>
        <p>{track?.album?.name}</p>
      </div>
    </div>
  );
}

export default SongRow;
