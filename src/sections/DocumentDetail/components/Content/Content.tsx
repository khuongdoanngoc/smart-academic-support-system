import classNames from "classnames/bind";
import styles from "./Content.module.scss";

const cx = classNames.bind(styles);

// Import the main component
import { Viewer } from "@react-pdf-viewer/core";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

import { Worker } from "@react-pdf-viewer/core";

interface IDetailDoc {
    url: string | undefined;
}

function Content({ url }: IDetailDoc) {
    return (
        <div
            className={cx("content")}
            style={{
                border: "1px solid rgba(0, 0, 0, 0.3)",
                height: "750px",
            }}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                {url && <Viewer fileUrl={url} />}
            </Worker>
        </div>
    );
}

export default Content;
