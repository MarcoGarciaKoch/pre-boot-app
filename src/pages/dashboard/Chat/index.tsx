import { IonList, IonListHeader, IonItem, IonInput, IonButton } from "@ionic/react";
import './style.css';
import { useTranslation } from 'react-i18next';
import ChatMessage from '../Chat/components/chatMessage/index';
import ConectedUser from '../Chat/components/conectedUsers/index';
import { useEffect, useRef } from 'react';


const Chat = ({ userCourseData, usersConnected, messageList, newMessage, handleNewMessageChange, handleSendMessage }: any) => {
    const [t, i18n] = useTranslation('translation');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        requestAnimationFrame(() => {
            const divRef = messagesEndRef.current;
            divRef?.scroll({
                top: divRef.scrollHeight,//scroll to the bottom of the element
                behavior: 'smooth' //auto, smooth, initial, inherit
            });
        });
    }

    useEffect(() => {
        scrollToBottom()
    }, [messageList]);

    return (
        <IonList inset={true} className='chat__container'>
            <IonListHeader color="medium" className='chat-list__header'>{t('specific.dashboard.chat')}</IonListHeader>
            <IonItem lines="full">
                {userCourseData?.course.students.map((u: any, i: any) => <ConectedUser key={i} user={u} usersConected={usersConnected} avatar={userCourseData.student.avatar}></ConectedUser>)}
            </IonItem>
            <div ref={messagesEndRef} className='messages-scrollable__container'>
                {messageList.map((message: any, i: any) => <ChatMessage key={i} message={message} userCourseData={userCourseData}></ChatMessage>)}
            </div>
            <IonItem className='send-message__container'>
                <IonInput
                    className='ion-margin'
                    type='text'
                    value={newMessage}
                    onIonChange={handleNewMessageChange}
                    placeholder={t('specific.dashboard.placeholder')}
                ></IonInput>
                <IonButton type='submit' onClick={handleSendMessage} color='secondary' className='ion-align-self-center'>{t('specific.dashboard.button')}</IonButton>
            </IonItem>
        </IonList>
    )
}


export default Chat;