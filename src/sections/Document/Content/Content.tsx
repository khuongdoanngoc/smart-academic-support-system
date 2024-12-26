/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";
import styles from "./Content.module.scss";
const cx = classNames.bind(styles);
import Background from "../../../assets/images/library.background.jpeg";
import { Statistics } from "./Statistics";
import { Docs } from "./Docs";

import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useEffect, useState } from "react";
import {
    getPopularDocuments,
} from "../../../redux/DocumentSlice/documentSlice";
import { PopularFolders } from "./PopularFolders";
import { getPopularFolders } from "../../../redux/FolderSlice/folderSlice";
import { getStatsForUser } from "../../../redux/StatsSlice/statsSlice";

export default function Content() {
    const dispatch = useAppDispatch();
    const documents = useAppSelector((state) => state.document.Documents);
    const popularFolders = useAppSelector((state) => state.folder.data.content);
    const stats = useAppSelector((state) => state.stats.stats);
    const [dataPopularFolders, setDataPopularFolders] = useState<any[]>([]);
    const [statsData, setStatsData] = useState<any>({});

    useEffect(() => {
        dispatch(getPopularDocuments(3));
        dispatch(getPopularFolders(8));
        dispatch(getStatsForUser());
    }, [dispatch]);

    useEffect(() => {
        if (popularFolders) {
            setDataPopularFolders(popularFolders);
        }
        if (stats) {
            setStatsData(stats);
        }
    }, [popularFolders, stats]);

    const handleLoadMore = (status: string) => {
        if (status === "loadmore") {
            dispatch(getPopularDocuments(9));
        } else {
            dispatch(getPopularDocuments(3));
        }
    };





    return (
        <div className={cx("content")}>
            <img src={Background} alt="bg" />
            <div className={cx("central")}>
                <div className={cx("category")}>
                    <Docs
                        title={"Tài liệu phổ biến"}
                        onLoadMore={handleLoadMore}
                        docs={documents}
                    />
                </div>
                <Statistics data={statsData} />
            </div>
            
            <PopularFolders data={dataPopularFolders} />
        </div>
    );
}
