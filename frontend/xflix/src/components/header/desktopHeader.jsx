import { useEffect, useStatecd } from "react";
import axios from "axios";
import Box from "@mui/system/Box";
// import xlogo.png ;
import styles from "./desktop.module.css";
import searchIcon from "./search-icon.svg";
import Upload from "./upload";

export default function DesktopHeader() {
  return (
    <div>
      <nav>
        <div>
          <img src="xlogo.png" alt="xflix logo" />
        </div>
        <Box className={styles.search_bar}>
          <input
            className={styles.search_input}
            placeholder="Search Vedio title"
          />
          <button className={styles.search_button}>
            <img src={searchIcon} className={styles.logo_img}></img>
          </button>
        </Box>
        <Upload />
      </nav>
    </div>
  );
}
