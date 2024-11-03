import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { fetchNotifications } from '../redux/notificationSlice';
import store from '../redux/store';

const SOCKET_URL = 'http://localhost:8888/api/v1/web-socket';

let stompClient = null;

export const connectWebSocket = (userId) => {
    const socket = new SockJS(SOCKET_URL);
    stompClient = new Client({
        webSocketFactory: () => socket,
        debug: (str) => {
            console.log(str);
        },
        onConnect: (frame) => {
            console.log('Connected: ' + frame);

            stompClient.subscribe(`/topic/notifications/${userId}`, (message) => {
                console.log('Public Notification:', message);
                store.dispatch(fetchNotifications());
            });

            stompClient.subscribe('/user/topic/notifications', (message) => {
                console.log('User Notification:', message);
                store.dispatch(fetchNotifications());
            });
        },
        onStompError: (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        },
    });

    stompClient.activate();
};

export const disconnectWebSocket = () => {
    if (stompClient) {
        stompClient.deactivate();
        console.log('WebSocket disconnected');
    }
};
