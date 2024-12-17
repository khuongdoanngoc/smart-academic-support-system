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
    const documents: any = useAppSelector(
        (state: any) => state.document.Documents.content
    );

    useEffect(() => {
        dispatch(getAllDocuments(3));
    }, []);

    console.log(documents);

    const handleLoadMore = (state: string) => {
        if (state === "expand") {
            dispatch(getAllDocuments(9));
        } else {
            dispatch(getAllDocuments(3));
        }
    };

    return (
        <div className={cx("content")}>
            <img src={Background} alt="bg" />
            <div className={cx("central")}>
                <div className={cx("category")}>
                    {staticDocs.map((data, index) => (
                        <Docs
                            key={index}
                            title={data.title}
                            onLoadMore={handleLoadMore}
                            docs={documents}
                        />
                    ))}
                </div>
                <Statistics />
            </div>
            <Subjects />
        </div>
    );
}
