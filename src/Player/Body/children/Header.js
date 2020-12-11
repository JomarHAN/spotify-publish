import { Avatar, IconButton } from "@material-ui/core";
import { Close, MenuOpen, Search } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDataLayerValue } from "../../../data/dataLayer";
import "./Header.css";

function Header() {
  const [{ user, popup }, dispatch] = useDataLayerValue();
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (menu) {
      dispatch({
        type: "SET_POPUP",
        popup: true,
      });
    } else {
      dispatch({
        type: "SET_POPUP",
        popup: false,
      });
    }
  }, [menu]);

  return (
    <div className="header">
      <div className="header__menu">
        {!menu ? (
          <IconButton className="header__menuBtn" onClick={() => setMenu(true)}>
            <MenuOpen />
          </IconButton>
        ) : (
            <IconButton
              className="header__menuBtn"
              onClick={() => setMenu(false)}
            >
              <Close />
            </IconButton>
          )}
      </div>
      <div className="header__left">
        <Search />
        <input type="text" placeholder="Search for Artists, Songs or Podcast" />
      </div>
      <div className="header__right">
        <Avatar src={user?.images[0]?.url} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;
