import classNames from "classnames/bind";
import styles from "./Content.module.scss";

const cx = classNames.bind(styles);

// Import the main component
import { Viewer } from "@react-pdf-viewer/core";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

import { Worker } from "@react-pdf-viewer/core";

const fileURL =
    "https://storage.googleapis.com/popsocket-c5b28.appspot.com/51e18c39-fa90-4442-84c2-3094322627d3_gioi_thieu_ve_co_so_du_lieu.pdf.pdf";

const fileURL2 =
    "https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf";

function Content() {
    return (
        <div
            className={cx("content")}
            style={{
                border: "1px solid rgba(0, 0, 0, 0.3)",
                height: "750px",
            }}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer fileUrl={fileURL} />
            </Worker>
        </div>
    );
}

export default Content;
