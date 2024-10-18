import classNames from "classnames/bind";
import styles from "./SupportView.module.scss";
import { Banner } from "../Banner";
import { Content } from "../Content";
import { QuestionForm } from "../QuestionForm";
const cx = classNames.bind(styles);

export default function SupportView() {
    return (
        <div className={cx("support-view")}>
            <Banner />
            <Content />
            <QuestionForm />
        </div>
    );
}
