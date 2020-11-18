import React from "react";
import { useDataLayerValue } from "../../../data/dataLayer";
import "./SidebarOption.css";

function SidebarOption({ title, Icon, id, spotify }) {
  const [{}, dispatch] = useDataLayerValue();

  const getCurrentPlaylist = (id) => {
    dispatch({
      type: "SET_CURRENT_PLAYLIST",
      id: id,
    });

    spotify.getPlaylistTracks(id).then((res) => {
      dispatch({
        type: "SET_TRACKS",
        tracks: res,
      });
    });
  };
  return (
    <div className="sidebarOption">
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? (
        <h4>{title}</h4>
      ) : (
        <p onClick={() => getCurrentPlaylist(id)}>{title}</p>
      )}
    </div>
  );
}

export default SidebarOption;
