import classNames from "classnames/bind";
import styles from "./FolderDirectory.module.scss";
const cx = classNames.bind(styles);
import { useState } from "react";
import logoTitle from "../../../../assets/images/Folder.png";
import logoClass from "../../../../assets/images/School.png";
import logoName from "../../../../assets/images/User_box.png";
import logoNumberDocs from "../../../../assets/images/File_dock.png";
import logoNumberStudent from "../../../../assets/images/User_alt.png";
import { Button } from "../../../../components/Button";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../components/Loader/Loader";


export default function FolderDirectory({ data }: any) {
    const navigate = useNavigate();
    // configs cho nút xem thêm
    const [visibleCount, setVisibleCount] = useState<number>(4);
    const handleToggle = () => {
        if (visibleCount === 4) {
            setVisibleCount(visibleCount + 4);
        } else {
            setVisibleCount(4);
        }
    };

    const handleSeeDetailFolder = (id: number) => {
        navigate(`/document/folder/${id}`);
    };

    return (
        <div className={cx("folder-directory")}>
            <div className={cx("directory-title")}>
                <h2>THƯ MỤC CỦA TÔI</h2>
                <span onClick={handleToggle}>
                    {visibleCount === 4 ? "Xem thêm" : "Thu gọn"}
                </span>
            </div>
            {Array.isArray(data) ? (
                <div className={cx("directory-cards")}>
                    {data
                        ?.slice(0, visibleCount)
                        .map((folderData: any, index: number) => (
                            <div key={index} className={cx("cards-list")}>
                                <div className={cx("list-title")}>
                                    <img
                                        src={logoTitle}
                                        alt={folderData.title}
                                    />
                                    <p>{folderData.folderName}</p>
                                </div>
                                <div className={cx("list-class")}>
                                    <img
                                        src={logoClass}
                                        alt={folderData.subjectCode}
                                    />
                                    <p>{folderData.subjectCode}</p>
                                </div>
                                <div className={cx("list-name")}>
                                    <img
                                        src={logoName}
                                        alt={folderData.ownerName}
                                    />
                                    <p>{folderData.ownerName}</p>
                                </div>
                                <div className={cx("list-number")}>
                                    <div className={cx("list-number-docs")}>
                                        <img
                                            src={logoNumberDocs}
                                            alt={folderData.documentCount}
                                        />
                                        <p>{folderData.documentCount}</p>
                                    </div>
                                    <div className={cx("list-number-student")}>
                                        <img
                                            src={logoNumberStudent}
                                            alt={folderData.accountEmail}
                                        />
                                        <p>{folderData.accountEmail}</p>
                                    </div>
                                </div>
                                <div className={cx("list-button")}>
                                    <Button
                                        text="Xem chi tiết"
                                        paddingX={18}
                                        paddingY={3}
                                        fontSize={14}
                                        onClick={() =>
                                            handleSeeDetailFolder(
                                                folderData.folderId
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                </div>
            ) : (
                <Loader height={10} />
            )}
        </div>
    );
}
