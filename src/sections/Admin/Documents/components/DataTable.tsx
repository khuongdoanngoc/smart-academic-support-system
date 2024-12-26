/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { customFormatDate } from "../../../../utils/formatDate";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { trainChatbotAction } from "../../../../redux/ChatBotSlice/ChatBotSlice";
import Loader from "../../../../components/Loader/Loader";
import { toast } from "react-toastify";
interface IDataTable {
  columns: any[];
  rows: any[];
  page: number;
  setPage: any;
  topic: string;
  selectedDocuments: number[];
  setSelectedDocuments: any;
}

export default function DataTable({
  columns,
  rows,
  page,
  setPage,
  topic,
  selectedDocuments,
  setSelectedDocuments,
}: IDataTable) {
  const dispatch = useAppDispatch();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { loading } = useAppSelector((state) => state.chatbot);

  const allSelected = selectedDocuments.length === rows.length;

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSelectAllChange = () => {
    if (allSelected) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(
        rows.map((item) => (topic === "user" ? item.accountId : item.docId))
      );
    }
  };

  const handleCheckboxChange = (id: number) => {
    if (selectedDocuments.includes(id)) {
      setSelectedDocuments(
        selectedDocuments.filter((accountId) => accountId !== id)
      );
    } else {
      setSelectedDocuments([...selectedDocuments, id]);
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickTrainDocument = (fileName: string, filePath: string,isCheck:boolean) => {
    console.log(fileName);
    console.log(filePath);
    if(isCheck){
        const data = [
            {
              fileName: fileName,
              filePath: filePath,
            },
          ];
          dispatch(trainChatbotAction(data));
    }else{
        toast.info("Tài liệu chưa được kiểm tra");
    }
    
  };
  return (
    <>
      {loading ? (
        <Loader height={20} />
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ minWidth: 30 }}>
                    Tất cả
                    <Checkbox
                      checked={allSelected}
                      onChange={handleSelectAllChange}
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell align="center" style={{ minWidth: 100 }}>
                    {topic === "user" ? "Xem" : "Train"}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell align="center">
                          <Checkbox
                            checked={selectedDocuments.includes(
                              topic === "user" ? row.accountId : row.docId
                            )}
                            onChange={() =>
                              handleCheckboxChange(
                                topic === "user" ? row.accountId : row.docId
                              )
                            }
                          />
                        </TableCell>
                        {columns.map((column, index) => {
                          let value = row[column.id];
                          if (typeof value === "boolean") {
                            return (
                              <TableCell key={index} align={column.align}>
                                <Checkbox checked={value} />
                              </TableCell>
                            );
                          } else {
                            if (
                                index === 1 &&
                                topic === "document" &&
                                row.isCheck
                            ) {
                                value = "✓ " + value;
                            }
                            if (index === 4) {
                              value = customFormatDate(value);
                            }
                            return (
                              <TableCell key={index} align={column.align}>
                                {value}
                              </TableCell>
                            );
                          }
                        })}
                        <TableCell align="center">
                          <Link
                            style={{ color: "#DC4342" }}
                            onClick={(e) => {
                              if (
                                window.location.pathname === "/admin/documents"
                              ) {
                                e.preventDefault(); // prevent default link behavior
                                handleClickTrainDocument(
                                  row.fileName,
                                  row.filePath,
                                  row.isCheck
                                );
                              }
                            }}
                            to={
                              topic === "user"
                                ? `/admin/user-information/${row.accountId}`
                                : "/admin/documents"
                            }
                          >
                            {topic === "user" ? (
                              <VisibilityOutlinedIcon />
                            ) : (
                                <>
                                    {!row.isTrain && <SmartToyOutlinedIcon />}  
                                </>
                              
                            )}
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
  );
}
