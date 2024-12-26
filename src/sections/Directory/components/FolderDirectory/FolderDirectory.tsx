import classNames from "classnames/bind";
import styles from "./FolderDirectory.module.scss";
const cx = classNames.bind(styles);

import Carousel from "react-multi-carousel";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import "react-multi-carousel/lib/styles.css";

// import { useState } from "react";
// import logoTitle from "../../../../assets/images/Folder.png";
// import logoClass from "../../../../assets/images/School.png";
// import logoName from "../../../../assets/images/User_box.png";
// import logoNumberDocs from "../../../../assets/images/File_dock.png";
// import logoNumberStudent from "../../../../assets/images/User_alt.png";
// import { Button } from "../../../../components/Button";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../components/Loader/Loader";
import { truncateTextWithLength } from "../../../../utils/truncateText";

export default function FolderDirectory({ data }: any) {
    const navigate = useNavigate();

    console.log(data);

    return (
        <div className={cx("folder-directory")}>
            <div className={cx("directory-title")}>
                <h2>THƯ MỤC CỦA TÔI</h2>
            </div>
            {Array.isArray(data) ? (
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={3000}
                    centerMode={true}
                    className={cx("carousel")}
                    containerClass="container"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite={false}
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                        desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024,
                            },
                            items: 4,
                            partialVisibilityGutter: 40,
                        },
                    }}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={4}
                    swipeable>
                    {data.map((folder: any, index) => (
                        <div key={index} className={cx("popular-folder")}>
                            <FolderSpecialIcon sx={{ color: "#f36a1c" }} />
                            <h3>
                                {truncateTextWithLength(folder.folderName, 14)}
                            </h3>
                            <p>{folder.subjectCode}</p>
                            <p>by {folder.ownerName}</p>
                            <p>
                                <InsertDriveFileIcon /> {folder.documentCount}{" "}
                                documents
                            </p>
                            <button
                                onClick={() =>
                                    navigate(
                                        `/document/folder/${folder.folderId}`
                                    )
                                }>
                                Xem chi tiết
                            </button>
                        </div>
                    ))}
                </Carousel>
            ) : (
                <Loader height={10} />
            )}
        </div>
    );
}
