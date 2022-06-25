import { ChatContext } from './chat.context';
import { useContext, useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { CourseStudentDataContext } from '../CourseStudentData/courseStudentData.context';

const NEW_CHAT_MESSAGE_EVENT = "chat message"; // Name of the event
const USER__CONECTED = "user conected"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:4000";

function ChatProvider ({children}:any) {
    const [usersConnected, updateUsersConected] = useState([])
    const [messageList, setMessageList] = useState({})
    const {userCourseData}:any = useContext(CourseStudentDataContext)
    const socketRef:any = useRef();

    
    useEffect(() => {
        if(userCourseData.course.schoolID !== '') {
        //Creates a websocket connection
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {query: {courseId: userCourseData.student.course.idCourse, user:userCourseData.student.email}});


        //lstens from incoming conected users and last messages data
        socketRef.current.on(USER__CONECTED, (chatData:any) => {
            updateUsersConected(chatData.chat.usersConected);
            setMessageList(chatData.chat.messages)
        })

        //Listens from incoming messages
        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, ({chatData, id}:any) => {
            const ownedByCurrentUser = id === socketRef.current.id;
            const chatDataAndUserId:any = {chatData, ownedByCurrentUser}
            setMessageList(chatDataAndUserId);
        });

        // Destroys the socket reference when the connection is closed
        return () => {
            socketRef.current.disconnect();
        };
        }
    },[userCourseData]);

    console.log(usersConnected)
    console.log(messageList)
    // Sends a message to the server that forwards it to all users in the same room
    const sendMessage = (messageBody:any) => {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
        body: messageBody,
        senderId: socketRef.current.id,
        email: userCourseData.student.email,
        courseId: userCourseData.student.course.idCourse
        });
    };
    




    return (
        <ChatContext.Provider value={{usersConnected, messageList, sendMessage}}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider;