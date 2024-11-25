import classNames from "classnames/bind";
import styles from "./AISupportView.module.scss";
import { ProposalDocs } from "../ProposalDocs";
import { ChatBox } from "../ChatBox";
const cx = classNames.bind(styles);

export default function AISupportView() {
    return (
        <div className={cx("ai-support-page")}>
            <ProposalDocs />
            <ChatBox />
        </div>
    );
}
