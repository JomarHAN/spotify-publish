import { Grid, Slider } from "@material-ui/core";
import {
  PlayCircleFilled,
  PlaylistPlayOutlined,
  RepeatOneOutlined,
  ShuffleOutlined,
  SkipNextOutlined,
  SkipPreviousOutlined,
  VolumeDownOutlined,
} from "@material-ui/icons";
import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <div className="footer">
      <div className="footer__left">
        <img
          src="https://cdn.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_250/https://www.hypebot.com/wp-content/uploads/2020/07/discover-weekly-250x250.png"
          alt=""
          className="footer__albumLogo"
        />
        <div className="footer__songInfo">
          <h4>Co Chang Trai Viet Len Cay</h4>
          <p>Phan Manh Quynh</p>
        </div>
      </div>
      <div className="footer__center">
        <ShuffleOutlined className="footer__icon" />
        <SkipPreviousOutlined />
        <PlayCircleFilled className="footer__icon" fontSize="large" />
        <SkipNextOutlined />
        <RepeatOneOutlined className="footer__icon" />
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
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
