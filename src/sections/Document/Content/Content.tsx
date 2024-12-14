import classNames from "classnames/bind";
import styles from "./Content.module.scss";
const cx = classNames.bind(styles);
import Background from "../../../assets/images/library.background.jpeg";
import { Statistics } from "./Statistics";
import { Docs } from "./Docs";

import staticDocs from "./static-docs.json";
import { Subjects } from "./Subjects";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { getAllDocuments } from "../../../redux/DocumentSlice/documentSlice";
import { useEffect } from "react";

export default function Content() {
    const dispatch = useAppDispatch();
    const documents = useAppSelector((state: any) => state.document.Documents);

    useEffect(() => {
        dispatch(getAllDocuments());
    }, []);

    return (
        <div className={cx("content")}>
            <img src={Background} alt="bg" />
            <div className={cx("central")}>
                <div className={cx("category")}>
                    {staticDocs.map((data, index) => (
                        <Docs key={index} title={data.title} docs={documents} />
                    ))}
                </div>
                <Statistics />
            </div>
            <Subjects />
        </div>
    );
}
