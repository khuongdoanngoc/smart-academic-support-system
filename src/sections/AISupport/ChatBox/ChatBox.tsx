import classNames from "classnames/bind";
import styles from "./ChatBox.module.scss";
const cx = classNames.bind(styles);
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React, { useEffect, useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SlackICON from "../../../assets/images/icons/slack.png";
import SendICON from "../../../assets/images/icons/SendICON.png";
// import AttachICON from "../../../assets/images/icons/attach-square.png";
// import MicroICON from "../../../assets/images/icons/microphone-2.png";
import { Button } from "../../../components/Button";
import Avatar from "../../../assets/images/avatar.png";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  resetMessages,
  sendMessageAction,
  setMessagesUser,
} from "../../../redux/ChatBotSlice/ChatBotSlice";
const options = ["Làm mới", "Lưu tài liệu", "Tải xuống", "Chia sẻ"];
const ITEM_HEIGHT = 48;

type MessagesUser = {
  id: string;
  name: string;
  avatar: string;
  message: string;
  time: string;
  sender: string;
};
export default function ChatBox() {
  const dispatch = useAppDispatch();
  // configs cho popover
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isOpenSubbox, setIsOpenSubbox] = useState<boolean>(true);
  // config cho message
  const { messages, loading } = useAppSelector((state) => state.chatbot);
  const { username } = useAppSelector((state) => state.authentication);
  const [containMessage, setContainMessage] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState("");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleInputMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputMessage(value);
  };
  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      setContainMessage(true);
      const data = {
        id: Date.now().toString(),
        name: "DTU AI Chat",
        avatar: Avatar,
        message: inputMessage,
        time: new Date().toLocaleTimeString(),
        sender: "user",
      };
      dispatch(setMessagesUser(data));
      setInputMessage("");
      dispatch(sendMessageAction(data));
    }
  };

  const handleSubmitQuestion = () => {
    setContainMessage(true);
    const data = {
      id: Date.now().toString(),
      name: "DTU AI Chat",
      avatar: Avatar,
      message: inputMessage,
      time: new Date().toLocaleTimeString(),
      sender: "user",
    };
    dispatch(setMessagesUser(data));
    setInputMessage("");
    dispatch(sendMessageAction(data));
  };

  const handleClickOptions= (key:string)=>{
    setIsOpenSubbox(false);
    handleClose();
    if(key==="Làm mới"){
      dispatch(resetMessages());
    }
    if(key==="Lưu tài liệu"){
      // call API save file
    }
    if(key==="Tải xuống"){
      // call API download file
    }
    if(key==="Chia s��"){
      // call API share file
    }
  }


  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);

  return (
    <div className={cx("chat-box")}>
      <div className={cx("head")}>
        <div className={cx("title")}>
          <img src={SlackICON} alt="icon" />
          <h2>DTU AI Chat</h2>
        </div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              style: {
                borderRadius: "12px",
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "13ch",
              },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              selected={option === "Pyxis"}
              onClick={()=>handleClickOptions(option)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
      {containMessage ? (
        <div className={cx("messages")} ref={messagesEndRef}>
          {messages.map((message: MessagesUser, index: number) => {
            return (
              <div
                className={cx(
                  `${
                    message.sender === "user"
                      ? "message-sent"
                      : "message-received"
                  }`
                )}
                key={index}
              >
                <div className={cx("avatar")}>
                  <img src={Avatar} alt="avt" />
                </div>
                <div className={cx("message-content")}>
                  <p>
                    {/* {message.message.replace("\n","<br>")} */}
                    {message.message.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
            );
          })}
          {loading && (
            <div className={cx("message-received")}>
              <div className={cx("avatar")}>
                <img src={Avatar} alt="avt" />
              </div>
              <div className={cx("message-content")}>
                <div className={cx("loader")} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={cx("initial")}>
          <h2>CHÀO {username ? username : "Tên người dùng"}!</h2>
          {isOpenSubbox && (
            <div className={cx("sub-box")}>
              <p>
                Những câu hỏi của bạn sẽ được chúng tôi phân tích để đề xuất các
                tài liệu phù hợp cho bạn, nếu bạn không muốn có thể tắt tính
                năng này.
              </p>
              <div className={cx("actions")}>
                <Button
                  text="Tắt tính năng"
                  fontSize={14}
                  paddingY={6}
                  paddingX={15}
                  onClick={() => setIsOpenSubbox(false)}
                />
                <button
                  onClick={() => setIsOpenSubbox(false)}
                  className={cx("skip-btn")}
                >
                  Bỏ qua
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      

      <div className={cx("input-message")}>
        <input
          type="text"
          placeholder="Bạn cần DTU AI giúp gì không?"
          value={inputMessage}
          onKeyDown={handleKeyDown}
          onChange={handleInputMessage}
        />
        <img
          className={cx("send")}
          src={SendICON}
          alt="send"
          onClick={handleSubmitQuestion}
        />
      </div>
    </div>
  );
}
