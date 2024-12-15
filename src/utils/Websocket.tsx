
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import JsCookie from "js-cookie"
import { useAppDispatch, useAppSelector } from "../redux/store";
// import { updateNotification } from "../redux/Notication/NoticationSlice";
import { useEffect } from "react";

let stompClient: Client; 
export const WebsocketConnection: React.FC = () => {
    const dispatch= useAppDispatch();
    const {accountId}= useAppSelector(state=>state.authentication);
    const token= JsCookie.get("accessToken");
    useEffect(() => {
      if (!token) {
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
          `/user/${accountId}/queue/notifications`,
          (message) => {
            console.log("Received:", message.body);
            // dispatch(
            //   updateNotification({
            //     message: message.body,
            //     type: "NOTIFICATION",
            //   })
            // );
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
    }, [dispatch, accountId, token]);
    return null;
}

// export const Disconnect = () => {
//     if(stompClient){
//         stompClient.deactivate();
//         console.log('Disconnected from WebSocket');
//     }
    
// }
