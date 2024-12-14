import classNames from "classnames/bind";
import styles from "./Content.module.scss";
import Header from "./Header";
import PdfViewer from "../PdfViewer";
import { useState } from "react";
const cx = classNames.bind(styles);

function Content() {
    const [document, setDocument] = useState<string>("document.pdf");

    return (
        <div className={cx("content")}>
            {/* <Header /> */}
            <div className={cx("doc-view-container")}>
                <PdfViewer document={document} />
            </div>
        </div>
    );
}

export default Content;
