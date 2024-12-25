import classNames from "classnames/bind";
import styles from "./Directory.module.scss";
const cx = classNames.bind(styles);
import Background from "../../../assets/images/library.background.jpeg";
import FolderDirectory from "./FolderDirectory/FolderDirectory";
import { RouterTitle } from "../../../components/RouterTitle";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useEffect, useState } from "react";
import { getAllFolders } from "../../../redux/FolderSlice/folderSlice";
import Loader from "../../../components/Loader/Loader";

const DirectoryComponents = () => {
    const dispatch = useAppDispatch();

    const folders: any = useAppSelector((state) => state.folder.data);
    const [foldersData, setFoldersData] = useState<any[]>([]);
    const { loading } = useAppSelector((state) => state.folder);

    useEffect(() => {
        dispatch(getAllFolders());
    }, []);

    useEffect(() => {
        if (folders) {
            setFoldersData(folders);
        }
    }, [folders]);

    return (
        <div className={cx("directory-component")}>
            <img src={Background} alt="bg" />
            <RouterTitle title="TÀI LIỆU" />
            {loading ? (
                <Loader height={10} />
            ) : (
                <div className={cx("component-folder")}>
                    <div className={cx("component-folder-main")}>
                        <FolderDirectory data={foldersData} />
                    </div>
                </div>
            )}
        </div>
    );
};
export default DirectoryComponents;
