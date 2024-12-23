import classNames from "classnames/bind";
import styles from "./PopularFolders.module.scss";
const cx = classNames.bind(styles);
import Carousel from "react-multi-carousel";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import "react-multi-carousel/lib/styles.css";
import { useAppSelector } from "../../../../redux/store";
import Loader from "../../../../components/Loader/Loader";
interface IFolder {
    folderId: number;
    folderName: string;
    authorName: string;
    downloadCount: number;
}

interface PopularFoldersProps {
    data: IFolder[];
}

export default function PopularFolders({ data }: PopularFoldersProps) {
    const { loading } = useAppSelector((state) => state.folder);

    return (
        <div className={cx("popular-folders-container")}>
            <h2>Thư mục phổ biến</h2>
            {loading ? (
                <Loader height={20} />
            ) : (
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={3000}
                    centerMode={false}
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
                    slidesToSlide={1}
                    swipeable>
                    {data.map((folder: any, index) => (
                        <div key={index} className={cx("popular-folder")}>
                            <FolderSpecialIcon sx={{ color: "#f36a1c" }} />
                            <h3>{folder.folderName}</h3>
                            <p>by {folder.authorName}</p>
                            <p>
                                <InsertDriveFileIcon /> {folder.downloadCount}{" "}
                                documents
                            </p>
                            <button>Xem chi tiết</button>
                        </div>
                    ))}
                </Carousel>
            )}
        </div>
    );
}
