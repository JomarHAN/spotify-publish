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
  const [{ playlists }] = useDataLayerValue();

  return (
    <div className="sidebar">
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
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
