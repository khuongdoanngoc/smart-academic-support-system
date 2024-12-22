import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface AlertDialogProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
    ids: number[];
    title: string;
}

export default function AlertDialog({
    open,
    onClose,
    onDelete,
    ids,
    title,
}: AlertDialogProps) {
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Xoá {title}?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc chắn muốn xoá {ids.length} {title} đã chọn?
                        {ids.length > 0 && (
                            <>
                                <br />
                                <br />
                                ID {title}: {ids.join(", ")}
                            </>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ marginRight: "5px" }} onClick={onClose}>
                        Huỷ
                    </Button>
                    <Button sx={{ color: "red" }} onClick={onDelete} autoFocus>
                        Xác nhận xoá
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
