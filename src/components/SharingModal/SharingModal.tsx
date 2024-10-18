import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSharingModal } from "../../contexts/SharingModalContext";
import { Button } from "../Button";
import styles from "./SharingModal.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
const cx = classNames.bind(styles);

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
};

export default function SharingModal() {
    // config đóng mở modal
    const { open, closeSharingModal } = useSharingModal();

    // url
    const [url, setUrl] = useState<string>(
        "http://duytanforyou.com/vn/12345678/do-an-cdio-2024/..."
    );

    // config copy url
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy url: ", error);
        }
    };

    return (
        <Modal
            open={open}
            onClose={closeSharingModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography
                    sx={{
                        fontFamily: "Montserrat",
                        fontSize: "20px",
                        fontWeight: 700,
                        lineHeight: "29.26px",
                    }}
                    id="modal-modal-title"
                    variant="h6"
                    component="h2">
                    Chia sẻ tài liệu này
                </Typography>
                <div className={cx("email-form")}>
                    <input
                        placeholder="Chia sẻ liên kết qua email"
                        className={cx("email-input")}
                        type="text"
                    />
                    <Button
                        text="Gửi Email"
                        paddingX={20}
                        paddingY={11}
                        fontSize={15}
                    />
                </div>
                <input
                    className={cx("input-url")}
                    type="text"
                    value={url}
                    readOnly
                />
                <div className={cx("actions")}>
                    <button onClick={handleCopy}>
                        {!isCopied
                            ? "Sao chép đường liên kết"
                            : "Sao chép thành công"}
                    </button>
                    <Button
                        text="Xong"
                        paddingX={35}
                        paddingY={11}
                        fontSize={15}
                    />
                </div>
            </Box>
        </Modal>
    );
}
