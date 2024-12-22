import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface ApproveDialogProps {
    open: boolean;
    onClose: () => void;
    onApprove: () => void;
    ids: number[];
    title: string;
}

export default function ApproveDialog({
    open,
    onClose,
    onApprove,
    ids,
    title,
}: ApproveDialogProps) {
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    Phê duyệt {title}?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc chắn thực hiện phê duyệt {ids.length}{" "}
                        {title} đã chọn?
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
                    <Button
                        sx={{ color: "green" }}
                        onClick={onApprove}
                        autoFocus>
                        Xác nhận phê duyệt
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
