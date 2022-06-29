import { ChatContext } from './chat.context';
import { useContext, useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { CourseStudentDataContext } from '../CourseStudentData/courseStudentData.context';

const NEW_CHAT_MESSAGE_EVENT = "chat message"; // Name of the event
const USER__CONECTED = "user conected"; // Name of the event
const USER_CONECTED_LIST = "user conected list"; // Name of the event
const SOCKET_SERVER_URL = process.env.REACT_APP_API_BASE_URL || '';

function ChatProvider({ children }: any) {
    const [usersConnected, updateUsersConected] = useState([])
    const [messageList, setMessageList] = useState([])
    const [students, setStudents] = useState([]);
    const { userCourseData }: any = useContext(CourseStudentDataContext)
    const socketRef: any = useRef();


    useEffect(() => {
        if (userCourseData.course.schoolID !== '') {
            //Creates a websocket connection
            socketRef.current = socketIOClient(SOCKET_SERVER_URL, { query: { courseId: userCourseData.course._id, user: userCourseData.student.email } });


            //lstens from incoming conected users and last messages data
            socketRef.current.on(USER__CONECTED, (chatData: any) => {
                console.log('Usuario Conectado: ',chatData)
                updateUsersConected(chatData.chat.usersConected);
                setMessageList(chatData.chat.messages);
                setStudents(chatData.users);
            })

            //Listens from incoming messages
            socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, ({ chatData }: any) => {
                setMessageList(chatData.chat.messages);
            });

            socketRef.current.on(USER_CONECTED_LIST, (userConectedList:any) => {
                updateUsersConected(userConectedList);
            })

            // Destroys the socket reference when the connection is closed
            return () => {
                socketRef.current.disconnect();
            };
        }
    }, [userCourseData]);

    // Sends a message to the server that forwards it to all users in the same room
    const sendMessage = (messageBody: any) => {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: messageBody,
            senderId: socketRef.current.id,
            email: userCourseData.student.email,
            courseId: userCourseData.course._id
        });
    };





    return (
        <ChatContext.Provider value={{ usersConnected, messageList, sendMessage, students }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider;