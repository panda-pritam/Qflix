import { useEffect, useState } from "react";

import Box from "@mui/system/Box";

import "./darkLight.css";
import { Button } from "@mui/material";
// import xlogo.png ;
import styles from "./desktop.module.css";
import searchIcon from "./search-icon.svg";
import Upload from "./upload";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LightDarkTogglerBtn from "./togalerBtn";
import LoginLogoutBtn from "./loginLogoutBtn";
// for mobile nav bar
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fetchVideoList } from "../../redux/slices/getAllVideosList";
// import { ToastContainer, toast } from "react-toastify";
import SerachBar from "./serachBar";
export default function DesktopHeader() {
  const navigate = useNavigate();

  //----------------------------- for mobile nav bar ----------------------
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //---------------------------------Search functionality-----------------------------

  let dispatch = useDispatch();
  //getSearchVideoListReducer
  //fetchSearchVideoList
  let filterObj = useSelector((state) => state.VideoListReducer.filters);

  //----------------------------------------------------------------
  let theam = useSelector((state) => state.theamReducer.theam);
  //------------------------------------------------------
  return (
    <div class={theam == "dark" ? "darkNavDiv" : "lightNavDiv"}>
      <nav class={theam == "dark" ? "darkNav" : "lightNav"}>
        <div className={styles.imgDiv}>
          <img
            src="xlogo.png"
            alt="xflix logo"
            className={styles.logo}
            id={theam == "light" ? "lightImg" : "darkImg"}
          />
        </div>
        <Box id={styles.desktopSearchBar}>
          <SerachBar />
          <Box className={styles.btnDiv}>
            <LightDarkTogglerBtn />
            <LoginLogoutBtn />
            <Upload />
          </Box>
        </Box>
        {/* //----------------------------- for mobile nav bar ---------------------- */}
        <div id={styles.mobileOptions}>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "27ch",
              },
            }}
          >
            <MenuItem>
              <LightDarkTogglerBtn />
            </MenuItem>
            <MenuItem>
              <LoginLogoutBtn />
            </MenuItem>
            <MenuItem>
              <Upload />
            </MenuItem>
          </Menu>
        </div>
      </nav>
      <div id={styles.mobileSearchBar}>
        <SerachBar />
      </div>
    </div>
  );
}
