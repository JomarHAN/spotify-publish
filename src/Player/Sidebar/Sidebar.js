import {
  HomeOutlined,
  LibraryMusicRounded,
  SearchOutlined,
} from "@material-ui/icons";
import React from "react";
import { useDataLayerValue } from "../../data/dataLayer";
import SidebarOption from "./children/SidebarOption";
import "./Sidebar.css";

function Sidebar({ spotify }) {
  const [{ playlists, popup }] = useDataLayerValue();

  return (
    <div className={`sidebar ${popup ? 'sidebar__showsup' : ""}`}>
      {/* // <div className="sidebar"> */}
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png"
        alt=""
        className="sidebar__logo"
      />

      <SidebarOption title="Home" Icon={HomeOutlined} />
      <SidebarOption title="Search" Icon={SearchOutlined} />
      <SidebarOption title="Your Library" Icon={LibraryMusicRounded} />
      <br />
      <strong className="sidebar__title">PLAYLIST</strong>
      <hr />
      {playlists?.items?.map((playlist) => (
        <SidebarOption
          spotify={spotify}
          title={playlist.name}
          key={playlist.id}
          id={playlist.id}
        />
      ))}
    </div>
  );
}

export default Sidebar;
