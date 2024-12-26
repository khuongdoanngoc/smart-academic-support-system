/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames/bind";
import styles from "./Content.module.scss";
const cx = classNames.bind(styles);
import Background from "../../../assets/images/library.background.jpeg";
import { Statistics } from "./Statistics";
import { Docs } from "./Docs";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useEffect, useState } from "react";
import {
    getPopularDocuments,
} from "../../../redux/DocumentSlice/documentSlice";
import { DocumentResponse } from "../../../redux/DocumentSlice/InterfaceResponse";
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

    // configs for pagination
    const alphabet = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    const [currentPage, setCurrentPage] = useState<string>(alphabet[-1]);

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(alphabet[value - 1]);
    };

    const filteredDataList = (data: DocumentResponse[] | undefined) => {
        const newListDocuments = [...(data ?? [])];
        if (currentPage !== undefined) {
            if (newListDocuments) {
                console.log(newListDocuments);
                return newListDocuments.filter((item) =>
                    item?.title
                        .toLowerCase()
                        .startsWith(currentPage.toLowerCase())
                );
            }
        }
        return newListDocuments;
    };

    return (
        <div className={cx("content")}>
            <img src={Background} alt="bg" />
            <div className={cx("central")}>
                <div className={cx("category")}>
                    <Docs
                        title={"Tài liệu phổ biến"}
                        onLoadMore={handleLoadMore}
                        docs={filteredDataList(documents)}
                    />
                </div>
                <Statistics data={statsData} />
            </div>
            <Pagination
                count={alphabet.length}
                defaultPage={-1}
                siblingCount={7}
                onChange={handlePageChange}
                variant="outlined"
                renderItem={(item: any) => (
                    <PaginationItem
                        sx={{
                            margin: "0 6px",
                            fontFamily: "Inter",
                        }}
                        {...item}
                        page={alphabet[item.page - 1]}
                    />
                )}
            />
            <PopularFolders data={dataPopularFolders} />
        </div>
    );
}
