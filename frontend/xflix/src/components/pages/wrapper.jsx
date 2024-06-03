import DesktopFiltes from "../filters/desktopFilter";
import VideosGrid from "./videoGridPage";
import MobileFilter from "../filters/mobileFilter";
import styles from "./page.module.css";
import { ToastContainer, toast } from "react-toastify";

export default function Wrapper() {
  return (
    <div>
      <DesktopFiltes />
      <MobileFilter />
      <VideosGrid />
    </div>
  );
}
