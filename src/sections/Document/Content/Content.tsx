import classNames from "classnames/bind";
import styles from "./Content.module.scss";
const cx = classNames.bind(styles);
import Background from "../../../assets/images/library.background.jpeg";
import { Statistics } from "./Statistics";
import { Docs } from "./Docs";

import staticDocs from "./static-docs.json";
import { Subjects } from "./Subjects";
// import { useEffect } from "react";
// import { AppDispatch } from "../../../redux/store";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllDocuments } from "../../../redux/DocumentSlice/documentSlice";

export default function Content() {
    // const dispatch = useDispatch<AppDispatch>();
    // const documents = useSelector((state: any) => state.document.Documents);

    // useEffect(() => {
    //     dispatch(getAllDocuments());
    // }, []);

    return (
        <div className={cx("content")}>
            <img src={Background} alt="bg" />
            <div className={cx("central")}>
                <div className={cx("category")}>
                    {staticDocs.map((data, index) => (
                        <Docs key={index} title={data.title} docs={data.docs} />
                    ))}
                </div>
                <Statistics />
            </div>
            <Subjects />
        </div>
    );
}
