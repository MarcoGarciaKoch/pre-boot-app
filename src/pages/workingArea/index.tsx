import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonCol, IonRow, IonList, IonListHeader, IonInput,
         IonGrid, IonIcon, IonToggle, IonButton, IonImg, IonFooter, IonFab, IonFabButton, IonFabList, IonModal } from "@ionic/react";
import IconMessage from '../../assets/images/chat-icon.svg'
import LessonMarkDown from "./Components/lessonMarkDown";
import './style.css';
import Sun from '../../assets/images/sunny-outline.svg';
import { moon } from 'ionicons/icons';
import LogOut from '../../assets/images/logout.png';
import PreBoot from '../../assets/images/pre-boot-logo.png';
import Facebook from '../../assets/images/logo-facebook.svg';
import Twitter from '../../assets/images/logo-twitter.svg';
import Instagram from '../../assets/images/logo-instagram.svg';
import Linkedin from '../../assets/images/logo-linkedin.svg';
import Arrow from '../../assets/images/arrow-undo-outline.svg';
import { useTranslation } from 'react-i18next';
import { AUTH_STORAGE_KEY } from "../../core/auth/auth.utils";
import { useHistory, useParams } from "react-router-dom";
import Landing from "./Components/codingArea/landing";
import { CourseStudentDataContext } from "../../context/CourseStudentData/courseStudentData.context";
import { ChatContext } from "../../context/Chat/chat.context";
import ConectedUser from "../dashboard/conectedUsers";
import ChatMessage from "../dashboard/chatMessage";
import { useContext, useState } from "react";


const WorkingArea: React.FC = () => {
    const [t, i18n] = useTranslation('translation');
    const toggleDarkModeHandler = () => document.body.classList.toggle('dark');
    const history = useHistory();
    const id  = useParams();
    const { userCourseData, updateUserCourseData }:any = useContext(CourseStudentDataContext);
    const { usersConected, messagesList, sendMessage }:any = useContext(ChatContext);
    const [newMessage, setNewMessage] = useState('');
    const [showModal, setShowModal] = useState(false);



    const logOut = () => {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      if (sessionStorage.getItem(AUTH_STORAGE_KEY) === null) {
          // after login, it will redirect to dashboard page
          history.push("/login"); 
      } 
  }


    const handleNewMessageChange = (e:any) => {
        const message = e.target.value
        setNewMessage(message)
    };


    const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage('');
    }


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
          <IonContent className="working-area-content-background">
            <IonGrid>
                <IonRow className="ion-justify-content-evenly">
                    <IonCol size="5" offset-4><LessonMarkDown markDownId={id}></LessonMarkDown></IonCol>
                    <IonCol size="5" offset-4 className="ion-padding-top"><Landing></Landing></IonCol>
                </IonRow>
            </IonGrid>
            <IonFab horizontal="end" vertical="bottom" slot="fixed" className="chat__fab">
                <IonFabButton color="secondary" size="small" onClick={() => setShowModal(true)}>
                    <IonIcon icon={IconMessage}></IonIcon>
                </IonFabButton>
            </IonFab>
            <IonModal isOpen={showModal} className='modal__container' onDidDismiss={() => setShowModal(false)}>
                <IonList inset={true} lines='inset' className='modal-chat__container'>
                    <IonItem lines="none">
                        <IonListHeader> SUPER CHAT </IonListHeader>
                        <IonButton onClick={() => setShowModal(false)} color="secondary">X</IonButton>
                    </IonItem>
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
                        <IonButton type="submit" onClick={handleSendMessage} color='secondary' className='ion-align-self-center'>SEND</IonButton>
                    </IonItem>
                </IonList>
            </IonModal>
            <IonFab horizontal="end" vertical="bottom" slot="fixed" className="social-media__fab">
                <IonFabButton color="light" size='small'>
                    <IonIcon icon={Arrow}></IonIcon>
                </IonFabButton>
                <IonFabList side="start">
                    <IonFabButton color="light">
                    <IonIcon icon={Facebook}></IonIcon>
                    </IonFabButton>
                    <IonFabButton color="light">
                    <IonIcon icon={Twitter}></IonIcon>
                    </IonFabButton>
                    <IonFabButton color="light">
                    <IonIcon icon={Instagram}></IonIcon>
                    </IonFabButton>
                    <IonFabButton color="light">
                    <IonIcon icon={Linkedin} color='dark'></IonIcon>
                    </IonFabButton>
                </IonFabList>
        </IonFab>
            <IonFooter collapse='fade'>
                <IonToolbar>
                    <IonTitle>Footer - @Marco García Koch</IonTitle>
                </IonToolbar>
            </IonFooter>
        </IonContent>
        </IonPage>
      );
}



export default WorkingArea;