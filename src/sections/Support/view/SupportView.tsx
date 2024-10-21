import classNames from "classnames/bind";
import styles from "./SupportView.module.scss";
import { Banner } from "../Banner";
import { Content } from "../Content";
import { QuestionForm } from "../QuestionForm";
import { getPosts } from "../../../services/TestAPI/testAPI";
import { useState } from "react";
const cx = classNames.bind(styles);

export default function SupportView() {
    const [response, setResponse] = useState<any>();

    getPosts().then((res) => {
        setResponse(res?.response);
    });

    console.log(response);

    return (
        <div className={cx("support-view")}>
            <Banner />
            <Content />
            <QuestionForm />
        </div>
    );
}
