/* eslint-disable @typescript-eslint/no-unused-vars */
import classnames from "classnames/bind";
import styles from "./DocumentStorageComponents.module.scss";
import File from "../../../assets/images/File_dock.svg";

import ImportLight from "../../../assets/images/Import_light.png";
import Delect from "../../../assets/images/Frame 8819.png";
import Share from "../../../assets/images/fi_share-2.png";
import {
  debounce,
  Pagination,
  PaginationItem,
  PaginationRenderItemParams,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import { DelectDocumentStogeAction } from "../../../redux/DocumentSlice/documentSlice";
// import { documentState } from "../../../services/DocumentAPI/DocumentAPI";

const cx = classnames.bind(styles);
// interface Subject {
//   id: number;
//   title: string;
// }

// const fakeSubjects: Subject[] = [
//   {
//     id: 1,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 1",
//   },
//   {
//     id: 2,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 2",
//   },
//   {
//     id: 3,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 3",
//   },
//   {
//     id: 4,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 4",
//   },
//   {
//     id: 5,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 5",
//   },
//   {
//     id: 6,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 6",
//   },
//   {
//     id: 7,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 7",
//   },
//   {
//     id: 8,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 8",
//   },
//   {
//     id: 9,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 9",
//   },
//   {
//     id: 10,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 10",
//   },
//   {
//     id: 11,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024...11",
//   },
//   {
//     id: 12,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 12",
//   },
//   {
//     id: 13,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 13",
//   },
//   {
//     id: 14,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 14",
//   },
//   {
//     id: 15,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 15",
//   },
//   {
//     id: 16,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 16",
//   },
//   {
//     id: 17,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 17",
//   },
//   {
//     id: 18,
//     title: " Tiêu đề của tài liệu...Câu hỏi ôn tập - CDIO CMU-2024... 18",
//   },
// ];

const DocumentStorageComponents = () => {
  const alphabet = Array.from("1234567");
  const dispatch = useAppDispatch();

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const debounceSearch=useCallback(debounce((pageSize:number,pageNum:number)=>dispatch(GetDocumentStogeAction({pageSize,pageNum})),1000),[dispatch])
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    // debounceSearch(itemsPerPage,value);
  };

  // const {documentStoge}:{documentStoge:documentState[]} =useSelector((state:RootState) => state.document);

  // const filteredDataList = (data: documentState[]) => {
  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   return data.slice(startIndex, endIndex);
  // };
  const handleDelectDocument=(id:number)=>{
    dispatch(DelectDocumentStogeAction(id));
  }

  return (
    <div className={cx("author-component")}>
      <div className={cx("author-component-file")}>
        <div className={cx("conponent-file-bottom")}>
          <div className={cx("file-bottom-title")}>
            <h3>TÀI LIỆU ĐÃ LƯU</h3>
          </div>
          <div className={cx("file-bottom-list")}>
            <div className={cx("bottom-list-title")}>
              <p>Tiêu đề tài liệu</p>
              <p>Chức năng</p>
            </div>
            <div className={cx("bottom-list-table")}>
              {/* {filteredDataList(documentStoge).map((data) => (
                <div className={cx("bottom-list-item")} key={data.id}>
                  <div className={cx("list-item-left")}>
                    <img src={File} alt="file" />
                    <p>{data.title}</p>
                  </div>
                  <div className={cx("list-item-right")}>
                    <img src={ImportLight} alt="down"  />
                    <img src={Share} alt="share" />
                    <img src={Delect} alt="Delect" onClick={() => handleDelectDocument(data.id)} />
                  </div>
                </div>
              ))} */}
            </div>
          </div>
        </div>
        <div className={cx("conponent-file-slide")}>
          <Pagination
            count={alphabet.length}
            defaultPage={1}
            siblingCount={7}
            onChange={handlePageChange}
            variant="outlined"
            renderItem={(item: PaginationRenderItemParams) => (
              <PaginationItem
                sx={{
                  margin: "0 6px",
                  fontFamily: "Inter",
                }}
                {...item}
                page={item.page ? alphabet[item.page - 1] : null}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};
export default DocumentStorageComponents;
