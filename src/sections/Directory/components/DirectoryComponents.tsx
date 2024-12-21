import classNames from "classnames/bind";
import styles from "./Directory.module.scss";
const cx = classNames.bind(styles);
import Background from "../../../assets/images/library.background.jpeg";
import folderDirectory from "../folder_directory.json";
import docsDirectory from "../docs_directory.json";
import { DocsDirectory } from "./DocsDirectory";
import FolderDirectory from "./FolderDirectory/FolderDirectory";
import { RouterTitle } from "../../../components/RouterTitle";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useEffect } from "react";
import { getAllFolders } from "../../../redux/FolderSlice/folderSlice";

const DirectoryComponents = () => {
    const dispatch = useAppDispatch();

    const folders: any = useAppSelector((state) => state.folder.data);

    useEffect(() => {
        dispatch(getAllFolders());
    }, []);

    return (
        <div className={cx("directory-component")}>
            <img src={Background} alt="bg" />
            <RouterTitle title="TÀI LIỆU" />
            <div className={cx("component-folder")}>
                <div className={cx("component-folder-main")}>
                    <FolderDirectory data={folders} />
                </div>
            </div>
            {/* <div className={cx("component-docs")}>
                <div className={cx("component-docs-main")}>
                    {docsDirectory.map((data, index) => (
                        <DocsDirectory
                            key={index}
                            title={data.title}
                            docs={data.docs}
                        />
                    ))}
                </div>
            </div> */}
        </div>
    );
};
export default DirectoryComponents;
