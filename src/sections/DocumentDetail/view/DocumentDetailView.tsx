import classNames from "classnames/bind";
import styles from "./DocumentDetailView.module.scss";
import { Sidebar } from "../components/Sidebar";
import { Content } from "../components/Content";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useParams } from "react-router-dom";
import { getDocumentByIDAction } from "../../../redux/DocumentSlice/documentSlice";
import Loader from "../../../components/Loader/Loader";
const cx = classNames.bind(styles);

export default function DocumentDetailView() {
    const { id }: any = useParams();
    const dispatch = useAppDispatch();

    const document: any = useAppSelector(
        (state) => state.document.DocumentDetail
    );

    const { loading } = useAppSelector((state) => state.document);

    useEffect(() => {
        dispatch(getDocumentByIDAction(parseInt(id)));
    }, []);

    if (loading) {
        return <Loader height={100} />;
    }

    console.log(document)

    return (
        <div className={cx("document-detail-view")}>
            <Sidebar doc={document} />
            <Content id={id} url={document?.filePath} />
        </div>
    );
}
