import { Grid, Slider } from "@material-ui/core";
import {
  PauseCircleFilled,
  PlayCircleFilled,
  PlaylistPlayOutlined,
  RepeatOneOutlined,
  ShuffleOutlined,
  SkipNextOutlined,
  SkipPreviousOutlined,
  VolumeDownOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import { useDataLayerValue } from "../../data/dataLayer";
import { useSoundLayerValue } from "../../data/soundLayer";
import "./Footer.css";
function Footer() {
  const [{ track, tracks }, dispatch] = useDataLayerValue();
  const [
    { playing, volume, repeat, shuffle, audio, isRandom },
    soundDispatch,
  ] = useSoundLayerValue();
  const [random, setRandom] = useState(null);

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

  const volumeChange = (e, value) => {
    soundDispatch({
      type: "SET_VOLUME",
      volume: value / 100,
    });
  };

  const setRepeat = () => {
    if (!repeat && shuffle) {
      setShuffle();
    }
    soundDispatch({
      type: "SET_REPEAT",
      repeat: !repeat,
    });
  };

  const setShuffle = () => {
    if (!shuffle && repeat) {
      setRepeat();
    }
    soundDispatch({
      type: "SET_SHUFFLE",
      shuffle: !shuffle,
    });
  };

  const setNewTrack = (rawTrack) => {
    soundDispatch({
      type: "SET_TRACK",
      track: rawTrack,
    });

    let isPlaying = playing;
    soundDispatch({
      type: "SET_PLAYING",
      playing: false,
    });

    let audio = new Audio(rawTrack?.preview_url);
    audio.loop = repeat;

    soundDispatch({
      type: "SET_AUDIO",
      audio: audio,
    });

    if (isPlaying) {
      soundDispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
    document.title = `${rawTrack?.name} - ${rawTrack?.artists[0]?.name}`;
  };

  const isShuffle = () => {
    if (shuffle) {
      while (true) {
        let randomNumber = Math.floor(Math.random() * tracks.items.length);
        let randomTrack = tracks.items[randomNumber].track;
        setRandom(randomTrack);
        if (track !== randomTrack) {
          setNewTrack(randomTrack);
        }
        soundDispatch({
          type: "SET_PREVIOUS",
          previous: randomTrack,
        });
        soundDispatch({
          type: "SET_ISRANDOM",
          isRandom: true,
        });
        break;
      }
    }
  };

  if (audio) {
    audio.onended = () => {
      if (shuffle === true) {
        isShuffle();
      } else {
        soundDispatch({
          type: "SET_PLAYING",
          playing: false,
        });
      }
    };
  }

  const handlePrevious = () => {
    if (shuffle === true) {
      isShuffle();
    } else {
      const previousTrack = tracks.items[trackIndex() - 1].track;
      setNewTrack(previousTrack);
      soundDispatch({
        type: "SET_ISRANDOM",
        isRandom: false,
      });
      dispatch({
        type: "SET_TRACK",
        track: previousTrack,
      });
    }
  };

  const handleNext = () => {
    if (shuffle === true) {
      isShuffle();
    } else {
      const nextTrack = tracks.items[trackIndex() + 1].track;
      setNewTrack(nextTrack);
      soundDispatch({
        type: "SET_ISRANDOM",
        isRandom: false,
      });
      dispatch({
        type: "SET_TRACK",
        track: nextTrack,
      });
    }
  };

  const trackIndex = () => {
    if (audio) {
      let itemArray = [];
      tracks.items.map((item) => {
        itemArray.push(item.track.preview_url);
      });
      const i = itemArray.indexOf(audio.src);
      return i;
    }
  };

  return (
    <div className="footer">
      <div className="footer__left">
        {!track ? (
          <>
            <img
              src="https://cdn.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_250/https://www.hypebot.com/wp-content/uploads/2020/07/discover-weekly-250x250.png"
              alt=""
              className="footer__albumLogo"
            />
            <div className="footer__songInfo">
              <h4>No Song Choose</h4>
            </div>
          </>
        ) : (
          <>
            <img
              src={
                isRandom === false
                  ? track?.album?.images[0]?.url
                  : random?.album?.images[0]?.url
              }
              alt=""
              className="footer__albumLogo"
            />
            <div className="footer__songInfo">
              <h4>{isRandom === false ? track?.name : random?.name}</h4>
              <p>
                {isRandom === false
                  ? track?.artists[0].name
                  : random?.artists[0].name}
              </p>
            </div>
          </>
        )}
      </div>
      <div className="footer__center">
        <ShuffleOutlined
          className={shuffle ? "footer__green" : "footer__icon"}
          onClick={track ? setShuffle : null}
        />
        <SkipPreviousOutlined
          className="footer__icon"
          onClick={handlePrevious}
        />
        {playing ? (
          <PauseCircleFilled
            className={playing ? "footer__green" : "footer__icon"}
            fontSize="large"
            onClick={track ? handleStop : null}
          />
        ) : (
          <PlayCircleFilled
            className={playing ? "footer__green" : "footer__icon"}
            fontSize="large"
            onClick={track ? handlePlay : null}
          />
        )}
        <SkipNextOutlined className="footer__icon" onClick={handleNext} />
        <RepeatOneOutlined
          className={repeat ? "footer__green" : "footer__icon"}
          onClick={track ? setRepeat : null}
        />
      </div>
      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayOutlined />
          </Grid>
          <Grid item>
            <VolumeDownOutlined />
          </Grid>
          <Grid item xs>
            <Slider
              aria-labelledby="discrete-slider"
              valueLabelDisplay="off"
              min={0}
              max={100}
              onChange={volumeChange}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
