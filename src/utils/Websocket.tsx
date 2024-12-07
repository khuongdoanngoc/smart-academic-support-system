
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import JsCookie from "js-cookie"

let stompClient: Client; 
export const WebsocketConnection = () => {
    const token= JsCookie.get("accessToken");
    try {
      if (!token) {
        throw new Error('No access token found');
      }
       
        stompClient = new Client({
        webSocketFactory: () => new SockJS(`http://localhost:8088/api/v1/ws`),
        connectHeaders: {
          token: token
        },
        reconnectDelay: 5000, // Auto-reconnect after 5 seconds
        debug: (str) => console.log(str), // Debug output
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      stompClient.onConnect = () => {
        console.log('Connected to WebSocket!');

        stompClient.subscribe('/user/queue/notifications', (message) => {
          console.log('Received:', message.body);
        });
      };

      stompClient.onStompError = (frame) => {
        console.error('Broker reported error:', frame.headers['message']);
        console.error('Additional details:', frame.body);
      };

      stompClient.activate(); // Establish the connection
    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
    }
}

export const Disconnect = () => {
    if(stompClient){
        stompClient.deactivate();
        console.log('Disconnected from WebSocket');
    }
    
}
