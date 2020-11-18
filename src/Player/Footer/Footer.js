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
import React from "react";
import { useDataLayerValue } from "../../data/dataLayer";
import { useSoundLayerValue } from "../../data/soundLayer";
import "./Footer.css";
function Footer() {
  const [{ track, tracks }] = useDataLayerValue();
  const [
    { playing, volume, repeat, shuffle, audio },
    soundDispatch,
  ] = useSoundLayerValue();

  console.log(tracks);
  console.log(audio);

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

  if (audio) {
    audio.onended = () => {
      if (shuffle) {
        while (true) {
          let randomNumber = Math.floor(Math.random() * tracks.items.length);
          let randomTrack = tracks.items[randomNumber].track;

          if (track !== randomTrack) {
            soundDispatch({
              type: "SET_TRACK",
              track: randomTrack,
            });

            let isPlaying = playing;
            soundDispatch({
              type: "SET_PLAYING",
              playing: false,
            });

            let audio = new Audio(randomTrack.preview_url);
            audio.loop = repeat;

            if (!isPlaying) {
              soundDispatch({
                type: "SET_PLAYING",
                playing: true,
              });
            }
            document.title = `${randomTrack.name} - ${randomTrack.artist[0].name}`;
            break;
          }
        }
      }
    };
  }

  return (
    <div className="footer">
      <div className="footer__left">
        <img
          src={
            track
              ? track.album.images[0].url
              : "https://cdn.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_250/https://www.hypebot.com/wp-content/uploads/2020/07/discover-weekly-250x250.png"
          }
          alt=""
          className="footer__albumLogo"
        />
        <div className="footer__songInfo">
          <h4>{track ? track.name : "No Song Choose"}</h4>
          <p>{track && track.artists[0]?.name}</p>
        </div>
      </div>
      <div className="footer__center">
        <ShuffleOutlined
          className={shuffle ? "footer__green" : "footer__icon"}
          onClick={track ? setShuffle : null}
        />
        <SkipPreviousOutlined />
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
        <SkipNextOutlined />
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
