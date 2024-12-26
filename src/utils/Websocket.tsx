import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import JsCookie from "js-cookie";
import { useAppDispatch, useAppSelector } from "../redux/store";
// import { updateNotification } from "../redux/Notication/NoticationSlice";
import { useEffect } from "react";
import {
  updateNotification,
  updateNumberOfNotificationsAll,
  updateNumberOfNotificationsUnRead,
} from "../redux/Notication/NoticationSlice";

type NotificationResponse = {
  notificationId: number;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
};

let stompClient: Client;
export const WebsocketConnection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { accountId } = useAppSelector((state) => state.authentication);
  const { numberOfNotificationsUnRead, numberOfNotifications } = useAppSelector(
    (state) => state.notication
  );
  const token = JsCookie.get("accessToken");
  useEffect(() => {
    if (!token || accountId === null) {
      console.error("No access token found");
      return;
    }

    stompClient = new Client({
      webSocketFactory: () => new SockJS(`http://localhost:8088/api/v1/ws`),
      connectHeaders: {
        token: token,
      },
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = () => {
      console.log("Connected to WebSocket!");

      stompClient?.subscribe(
        `/user/${accountId}/queue/notifications-with-follow`,
        (message) => {
          console.log("Received file upload notification:", message.body);
          const data: NotificationResponse = JSON.parse(message.body);
          dispatch(updateNotification(data));
          dispatch(
            updateNumberOfNotificationsUnRead(numberOfNotificationsUnRead + 1)
          );
          dispatch(updateNumberOfNotificationsAll(numberOfNotifications + 1));
        }
      );
      stompClient?.subscribe(
        `/user/${accountId}/queue/notifications-with-upload`,
        (message) => {
          console.log("Received file upload notification:", message.body);
          const data: NotificationResponse = JSON.parse(message.body);
          dispatch(updateNotification(data));
          dispatch(
            updateNumberOfNotificationsUnRead(numberOfNotificationsUnRead + 1)
          );
          dispatch(updateNumberOfNotificationsAll(numberOfNotifications + 1));
        }
      );
    };

    stompClient.onStompError = (frame) => {
      console.error("Broker reported error:", frame.headers["message"]);
      console.error("Additional details:", frame.body);
    };

    stompClient.activate();

    return () => {
      stompClient?.deactivate();
      console.log("WebSocket connection closed");
    };
  }, [
    dispatch,
    accountId,
    token,
    numberOfNotificationsUnRead,
    numberOfNotifications,
  ]);
  return null;
};
