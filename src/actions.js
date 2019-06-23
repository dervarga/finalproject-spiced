// ALL of the action creators for the project are stored in the actions.js
// this is the place to make ajax requests
import axios from "./axios";
// import * as io from "socket.io-client";

export async function getChatMessages(msgs) {
    // console.log("getChatMessages fires in actions: ", msgs);
    return {
        type: "GET_CHAT_MESSAGES",
        chatMessages: msgs
    };
}

export async function addLastMessage(msg) {
    // console.log("lastMessage in actions: ", msg);
    return {
        type: "LAST_CHAT_MESSAGE",
        chatMessage: msg
    };
}

export function onlineUsers(users) {
    // console.log("onlineUsers in actions", users);
    let tempArr = [];
    for (let prop in users) {
        tempArr.push(users[prop]);
    }
    // console.log("tempArr", tempArr);
    return {
        type: "ONLINE_USERS",
        onlineUsers: tempArr
    };
}

// export function wallMessages(msgs) {
//     console.log("wallMessages in actions", msgs);
//     return {
//         type: "WALL_MESSAGES",
//         wallMessages: msgs
//     };
// }

// export async function sendChatMessage(msg) {
//     console.log("sendChatMessage fires, value to send: ", msg);
//
//     // socket.emit("sendChatMessage", msg);
//
//     // let result = await axios.post("/send-chat-message", {
//     //     message: msg
//     // });
//     return {
//         type: "SEND_CHAT_MESSAGE",
//         result: msg
//     };
// }
