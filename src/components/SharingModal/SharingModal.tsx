import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSharingModal } from "../../contexts/SharingModalContext";
import { Button } from "../Button";
import styles from "./SharingModal.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
const cx = classNames.bind(styles);
import emailjs from "@emailjs/browser";
import { useAppSelector } from "../../redux/store";
import { toast } from "react-toastify";

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
    const [email, setEmail] = useState<string>("");
    const fromName = useAppSelector(
        (state: any) => state.authentication.username
    );
    const [isSending, setIsSending] = useState<boolean>(false);

    // config đóng mở modal
    const { open, closeSharingModal, url } = useSharingModal();

    // config copy url
    const [isCopied, setIsCopied] = useState<boolean>(false);

    function isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy url: ", error);
        }
    };

    // config cho send email
    const sendEmail = () => {
        if (!isValidEmail(email)) {
            toast.error("Email này không tồn tại!");
            return;
        }
        if (isSending) return;
        setIsSending(true);
        var templateParams = {
            from_name: fromName,
            message: url,
            to_email: email,
        };
        emailjs
            .send(
                import.meta.env.VITE_EMAILJS_KEY,
                import.meta.env.VITE_EMAILJS_TEMPLATE,
                templateParams,
                {
                    publicKey: "UasBeH0VctySK7UHo",
                }
            )
            .then(
                () => {
                    console.log("SUCCESS!");
                    toast.success("Chia sẻ thành công!");
                    setEmail("")
                    closeSharingModal();
                },
                (error) => {
                    console.log(error);
                    console.log("FAILED...", error.text);
                    setEmail("")
                    toast.error("Xảy ra lỗi khi chia sẻ tài liệu!");
                }
            );

        setTimeout(() => {
            setIsSending(false);
        }, 3000);
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        text={isSending ? "Đang gửi" : "Gửi Email"}
                        paddingX={20}
                        paddingY={11}
                        fontSize={15}
                        onClick={sendEmail}
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
                        onClick={closeSharingModal}
                    />
                </div>
            </Box>
        </Modal>
    );
}
