import classNames from "classnames/bind";
import styles from "./DocumentDetailView.module.scss";
import { Sidebar } from "../components/Sidebar";
import { Content } from "../components/Content";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useParams } from "react-router-dom";
import { getDocumentByIDAction } from "../../../redux/DocumentSlice/documentSlice";
const cx = classNames.bind(styles);

export default function DocumentDetailView() {
    const { id }: any = useParams();
    const dispatch = useAppDispatch();

    const document = useAppSelector((state) => state.document.DocumentDetail);

    useEffect(() => {
        dispatch(getDocumentByIDAction(parseInt(id)));
    }, []);

    return (
        <div className={cx("document-detail-view")}>
            <Sidebar doc={document} />
            <Content url={document?.filePath} />
        </div>
    );
}
