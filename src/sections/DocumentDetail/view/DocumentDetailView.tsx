import classNames from "classnames/bind";
import styles from "./DocumentDetailView.module.scss";
import { Sidebar } from "../components/Sidebar";
import { Content } from "../components/Content";
import { useEffect } from "react";
import { useAppDispatch } from "../../../redux/store";
import { useParams } from "react-router-dom";
import { getDocumentByID } from "../../../redux/DocumentSlice/documentSlice";
const cx = classNames.bind(styles);

export default function DocumentDetailView() {
    const dispatch = useAppDispatch();
    const { id }: any = useParams();
    useEffect(() => {
        dispatch(getDocumentByID(parseInt(id)));
    }, []);

    return (
        <div className={cx("document-detail-view")}>
            <Sidebar />
            <Content />
        </div>
    );
}
