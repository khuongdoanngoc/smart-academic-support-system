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
import EditICON from "../../../../assets/images/icons/EditIcon.png";

interface IDataTable {
    columns: any[];
    rows: any[];
}

export default function DataTable({ columns, rows }: IDataTable) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [selectedDocuments, setSelectedDocuments] = React.useState<number[]>(
        []
    );
    const allSelected = selectedDocuments.length === rows.length;

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleSelectAllChange = () => {
        if (allSelected) {
            setSelectedDocuments([]);
        } else {
            setSelectedDocuments(rows.map((doc) => doc.id));
        }
    };
    const handleCheckboxChange = (id: number) => {
        if (selectedDocuments.includes(id)) {
            setSelectedDocuments(
                selectedDocuments.filter((docId) => docId !== id)
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
                            <TableCell align="center" style={{ minWidth: 100 }}>
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
                                Chỉnh sửa
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.name}>
                                        <TableCell align="center">
                                            <Checkbox
                                                checked={selectedDocuments.includes(
                                                    row.id
                                                )}
                                                onChange={() =>
                                                    handleCheckboxChange(row.id)
                                                }
                                            />
                                        </TableCell>
                                        {columns.map((column, index) => {
                                            const value = row[column.id];
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
                                            <a href="#">
                                                <img
                                                    src={EditICON}
                                                    alt="edit"
                                                />
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
