import { useIonViewWillEnter, IonHeader, IonPage, IonToolbar, IonItem, IonImg, IonTitle, IonIcon, IonToggle, IonButton, 
        IonContent, IonGrid, IonRow, IonCol, IonList, IonListHeader, IonAvatar, IonText, IonLabel, IonFooter, IonProgressBar, IonInput, useIonViewDidEnter } from '@ionic/react';
import './style.css';
import PreBoot from '../../assets/images/pre-boot-logo.png';
import { useTranslation } from 'react-i18next';
import { moon } from 'ionicons/icons';
import Sun from '../../assets/images/sunny-outline.svg';
import LogOut from '../../assets/images/logout.png';
import UserAvatar from '../../assets/images/avatar-bigote-chino.png';
import { useHistory } from "react-router-dom";
import { AUTH_STORAGE_KEY } from "../../core/auth/auth.utils";
import { useAuth } from '../../core/auth/auth.hook';
import Lesson from './markdownLesson/index';
import ChatMessage from './chatMessage/index';
import ConectedUser from './conectedUsers/index';
import { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../../context/Chat/chat.context';
import { CourseStudentDataContext } from '../../context/CourseStudentData/courseStudentData.context';


const Dashboard: React.FC = () => {
    const [t, i18n] = useTranslation('translation');
    const toggleDarkModeHandler = () => document.body.classList.toggle('dark');
    const history = useHistory();
    const { isAuth } = useAuth();
    const { userCourseData }:any = useContext(CourseStudentDataContext)
    const { usersConected, messagesList, sendMessage }:any = useContext(ChatContext); // Creates a websocket and manages data recovering from backend and messaging
    const [userList, setUserList] = useState({});
    const [chatList, setChatList] = useState({});
    const [newMessage, setNewMessage] = useState('');
    
    
    
    useIonViewWillEnter(() => {
        if (!isAuth) { 
            // Redirect to the /dashboard page when we are already logged in.
            history.push("/login");
        }
    },[]);

    useIonViewWillEnter(() =>{
        setUserList(usersConected)
    },[usersConected])

    useIonViewWillEnter(() =>{
        // if(messagesList !== {} && messagesList !== undefined) {
        setChatList(messagesList)
        // }
    },[messagesList])


    const handleNewMessageChange = (e:any) => {
        const message = e.target.value
        setNewMessage(message)
    };
    
    
    const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage('');
    }




    const logOut = () => {
        sessionStorage.removeItem(AUTH_STORAGE_KEY);
        if (sessionStorage.getItem(AUTH_STORAGE_KEY) === null) {
            // after login, it will redirect to dashboard page
            history.push("/login"); 
        } 
    }



    console.log(userList)
    console.log(chatList)

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonItem lines='none'>
                        <IonImg src={PreBoot} alt="pre-boot-logo" className="header__logo"/>
                        <IonTitle className="header__title">PRE-BOOT</IonTitle>
                    </IonItem>
                    <IonIcon slot="end" icon={Sun} />
                    <IonToggle slot="end" name="darkMode" onIonChange={toggleDarkModeHandler} />
                    <IonIcon slot="end" icon={moon} className="ion-padding-end"/>
                    <IonButton size='small' className="es-button__language ion-padding-start" onClick={() => i18n.changeLanguage("es")} slot="end">ES</IonButton>
                    <IonButton size='small' className="en-button__language ion-padding-end" onClick={() => i18n.changeLanguage("en")} slot="end" >EN</IonButton>
                    <IonImg slot='end' src={LogOut} alt='log-out-button' className="logout-button" onClick={logOut}></IonImg>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className='dashborad-content-background' /*scrollY={false}*/>
                <IonGrid>
                    <IonRow>
                        <IonCol size='12'>
                            <IonItem className='ion-padding-start ion-padding-end ion-padding-top' lines='none'>
                                <IonAvatar slot="start">
                                    <img src={UserAvatar} />
                                </IonAvatar>
                                <IonTitle slot='start'>Welcome {userCourseData.student.name}</IonTitle>
                                <IonText slot='end' className='progress__title'>Progress:</IonText>
                                <IonProgressBar 
                                    slot='end'
                                    color='tertiary'
                                    className='progress-bar' 
                                    value={((userCourseData.student.course.order*100)/userCourseData.course.lessons.length)/100} 
                                    buffer={(((userCourseData.student.course.order*100)/userCourseData.course.lessons.length)/100)+0.3}
                                ></IonProgressBar>
                                <IonText slot='end' className='progress__percentage'>{(userCourseData.student.course.order*100)/userCourseData.course.lessons.length}%</IonText>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size='4'>
                            {/* <IonVirtualScroll > */}
                            <IonList inset={true} lines='inset' className='lesson-list__container'>
                                <IonListHeader> LESSONS </IonListHeader>
                                {userCourseData?.course.lessons.map((l: any, i: any) => <Lesson key={i} lesson={l} userCourseData={userCourseData}></Lesson>)}
                            </IonList>
                            {/* </IonVirtualScroll> */}
                        </IonCol>
                        <IonCol size='4'>
                            <IonList inset={true} lines='inset'>
                                <IonListHeader> VIDEOCALLS </IonListHeader>
                                <IonItem>
                                <IonAvatar slot="start">
                                    <img src="./avatar-finn.png" />
                                </IonAvatar>
                                <IonLabel>
                                    <h2>Finn</h2>
                                    <h3>I'm a big deal</h3>
                                </IonLabel>
                                </IonItem>
                                <IonItem>
                                <IonAvatar slot="start">
                                    <img src="./avatar-finn.png" />
                                </IonAvatar>
                                <IonLabel>
                                    <h2>Finn</h2>
                                    <h3>I'm a big deal</h3>
                                </IonLabel>
                                </IonItem>
                                <IonItem>
                                <IonAvatar slot="start">
                                    <img src="./avatar-finn.png" />
                                </IonAvatar>
                                <IonLabel>
                                    <h2>Finn</h2>
                                    <h3>I'm a big deal</h3>
                                </IonLabel>
                                </IonItem>
                            </IonList>
                        </IonCol>
                        <IonCol size='4'>
                            <IonList inset={true} lines='inset' className='chat__container'>
                                <IonListHeader> SUPER CHAT </IonListHeader>
                                <IonItem lines='none'>
                                {userCourseData?.course.students.map((u:any,i:any) => <ConectedUser key={i} user={u} usersConected={usersConected}></ConectedUser>)}
                                </IonItem>
                                {messagesList?.map((message:any,i:any) => <ChatMessage key={i} message={message} userCourseData={userCourseData}></ChatMessage>)}
                                <IonItem className='send-message__container'>
                                    <IonInput
                                        className='ion-margin'
                                        type='text'
                                        value={newMessage}
                                        onIonChange={handleNewMessageChange}
                                        placeholder='Send a message'
                                    ></IonInput>
                                    <IonButton type='submit' onClick={handleSendMessage} color='secondary' className='ion-align-self-center'>SEND</IonButton>
                                </IonItem>
                            </IonList>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
            <IonFooter collapse='fade'>
                <IonToolbar>
                    <IonTitle>Footer - @Marco García Koch</IonTitle>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
}

export default Dashboard;