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
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const allSelected = selectedDocuments.length === rows.length;

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleSelectAllChange = () => {
        if (allSelected) {
            setSelectedDocuments([]);
        } else {
            setSelectedDocuments(
                rows.map((item) =>
                    topic === "user" ? item.accountId : item.docId
                )
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

    return (
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
                                    style={{ minWidth: column.minWidth }}>
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
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row, index) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={index}>
                                        <TableCell align="center">
                                            <Checkbox
                                                checked={selectedDocuments.includes(
                                                    topic === "user"
                                                        ? row.accountId
                                                        : row.docId
                                                )}
                                                onChange={() =>
                                                    handleCheckboxChange(
                                                        topic === "user"
                                                            ? row.accountId
                                                            : row.docId
                                                    )
                                                }
                                            />
                                        </TableCell>
                                        {columns.map((column, index) => {
                                            let value = row[column.id];
                                            if (typeof value === "boolean") {
                                                return (
                                                    <TableCell
                                                        key={index}
                                                        align={column.align}>
                                                        <Checkbox
                                                            checked={value}
                                                        />
                                                    </TableCell>
                                                );
                                            } else {
                                                if (index === 4) {
                                                    value =
                                                        customFormatDate(value);
                                                }
                                                return (
                                                    <TableCell
                                                        key={index}
                                                        align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            }
                                        })}
                                        <TableCell align="center">
                                            <a
                                                style={{ color: "#DC4342" }}
                                                href={
                                                    topic === "user"
                                                        ? `/admin/user-information/${row.accountId}`
                                                        : `/chatbot/${row.docId}`
                                                }>
                                                {topic === "user" ? (
                                                    <VisibilityOutlinedIcon />
                                                ) : (
                                                    <SmartToyOutlinedIcon />
                                                )}
                                            </a>
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
    );
}
