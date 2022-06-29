import { useIonViewWillEnter, IonHeader, IonPage, IonToolbar, IonItem, IonImg, IonTitle, IonIcon, IonToggle, IonButton, 
        IonContent, IonGrid, IonRow, IonCol, IonList, IonListHeader, IonAvatar, IonText, IonLabel, IonFooter, IonProgressBar, 
        IonSelect, IonSelectOption, IonFab, IonFabButton, IonFabList } from '@ionic/react';
import './style.css';
import PreBoot from '../../assets/images/pre-boot-logo.png';
import { useTranslation } from 'react-i18next';
import { moon } from 'ionicons/icons';
import Sun from '../../assets/images/sunny-outline.svg';
import LogOut from '../../assets/images/logout.png';
import HeadTeacher from '../../assets/images/alex.png';
import SupportTeacher from '../../assets/images/jose.png';
import Facebook from '../../assets/images/logo-facebook.svg';
import Twitter from '../../assets/images/logo-twitter.svg';
import Instagram from '../../assets/images/logo-instagram.svg';
import Linkedin from '../../assets/images/logo-linkedin.svg';
import Arrow from '../../assets/images/arrow-undo-outline.svg';
import { useHistory } from "react-router-dom";
import { AUTH_STORAGE_KEY } from "../../core/auth/auth.utils";
import { useAuth } from '../../core/auth/auth.hook';
import Lesson from './markdownLesson/index';
import { useContext, useState, ChangeEvent  } from 'react';
import { ChatContext } from '../../context/Chat/chat.context';
import { CourseStudentDataContext } from '../../context/CourseStudentData/courseStudentData.context';
import Chat from './Chat';
import { Avatars } from './dashboard.model';



const Dashboard: React.FC = () => {
    const [t, i18n] = useTranslation('translation');
    const toggleDarkModeHandler = () => document.body.classList.toggle('dark');
    const history = useHistory();
    const { isAuth } = useAuth();
    const { userCourseData }:any = useContext(CourseStudentDataContext)
    const { usersConnected, messageList, sendMessage, students }:any = useContext(ChatContext); // Creates a websocket and manages data recovering from backend and messaging
    const [newMessage, setNewMessage] = useState('');
    const [dark, setDark] = useState(false);
    
    useIonViewWillEnter(() => {
        if (!isAuth) { 
            // Redirect to the /dashboard page when we are already logged in.
            history.push("/login");
        }
    },[]);

 


    const handleNewMessageChange = (e:ChangeEvent<HTMLInputElement>) => {
        const message = e.target.value
        setNewMessage(message)
    };
    
    
    const handleSendMessage = ():any => {
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


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonItem lines='none'>
                        <IonImg src={PreBoot} alt="pre-boot-logo" className="header__logo"/>
                        <IonTitle className="header__title">PRE-BOOT</IonTitle>
                    </IonItem>
                    <IonIcon slot="end" icon={Sun} />
                    <IonToggle slot="end" name="darkMode" onIonChange={toggleDarkModeHandler} onClick={() => setDark(!dark)}/>
                    <IonIcon slot="end" icon={moon} className="ion-padding-end"/>
                    <IonButton size='small' className="es-button__language ion-padding-start" onClick={() => i18n.changeLanguage("es")} slot="end">ES</IonButton>
                    <IonButton size='small' className="en-button__language ion-padding-end" onClick={() => i18n.changeLanguage("en")} slot="end" >EN</IonButton>
                    <IonImg slot='end' src={LogOut} alt='log-out-button' className="logout-button" onClick={logOut}></IonImg>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen scrollY={true} scrollEvents={true} className={dark ? 'dashboard-dark-content-background' : 'dashboard-light-content-background'}>
                <IonGrid>
                    <IonRow className='ion-justify-content-center'>
                        <IonCol sizeXs='12' sizeSm='11' sizeMd='12' sizeLg='12' sizeXl='12'>
                            <IonItem color="light" className='ion-padding-start ion-padding-end ion-padding-top' lines='none'>
                                <IonAvatar slot="start">
                                    <img src={Avatars[userCourseData.student.avatar]} />
                                </IonAvatar>
                                <IonTitle slot='start'>{t('specific.dashboard.greeting')} {userCourseData.student.name}</IonTitle>
                                <IonText slot='end' className='progress__title'>{t('specific.dashboard.progress')}:</IonText>
                                <IonProgressBar 
                                    slot='end'
                                    color='tertiary'
                                    className='progress-bar' 
                                    value={((userCourseData.student.course.order*100)/userCourseData.course.lessons.length)/100} 
                                    // buffer={(((userCourseData.student.course.order*100)/userCourseData.course.lessons.length)/100)+0.3}
                                ></IonProgressBar>
                                <IonText slot='end' className='progress__percentage'>{(userCourseData.student.course.order*100)/userCourseData.course.lessons.length}%</IonText>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow className='ion-justify-content-center'>
                        <IonCol sizeXs='12' sizeSm='11' sizeMd='6' sizeLg='4' sizeXl='4'>
                            <IonList  inset={true} lines='inset' className='lesson-list__container'>
                                <IonListHeader color="medium" className='lessons-list__header'>{t('specific.dashboard.lessons')}</IonListHeader>
                                <div className='lessons-scrollable__container'>
                                    {userCourseData?.course.lessons.map((l: any, i: any) => <Lesson key={i} lesson={l} userCourseData={userCourseData}></Lesson>)}
                                </div>
                            </IonList>
                        </IonCol>
                        <IonCol sizeXs='12' sizeSm='11' sizeMd='6' sizeLg='4' sizeXl='4'>
                            <Chat userCourseData={userCourseData} usersConnected={usersConnected} messageList={messageList} newMessage={newMessage} students={students}
                                  handleNewMessageChange={handleNewMessageChange} handleSendMessage={handleSendMessage}>
                            </Chat>
                        </IonCol>
                        <IonCol sizeXs='12' sizeSm='11' sizeMd='12' sizeLg='4' sizeXl='4'>
                            <IonList inset={true} className='teacher-card__container'>
                                <IonListHeader color="medium" className='teacher-list__header'>{t('specific.dashboard.videocall')}</IonListHeader>
                                <IonItem lines='full'>
                                <IonAvatar slot="start" className='teacher_avatar'>
                                    <img src={HeadTeacher}/>
                                </IonAvatar>
                                <IonLabel>
                                    <h2 className='teacher-details'>Alejandro González</h2>
                                    <h3 className='teacher-details'>{t('specific.dashboard.head')}</h3>
                                </IonLabel>
                                </IonItem>
                                <IonItem className='ion-padding-start'>
                                    <IonLabel className='ion-text-wrap rol-input__label'>{t('specific.dashboard.slot')}</IonLabel>
                                    <IonSelect interface="popover" name='time-slot'>
                                        <IonSelectOption value="date-one">Wed-7 18:00</IonSelectOption>
                                        <IonSelectOption value="date-two">Tue-13 16:00</IonSelectOption>
                                        <IonSelectOption value="date-three">Thu-15 17:00</IonSelectOption>
                                        <IonSelectOption value="date-four">Mon-19 17:00</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                            </IonList>
                            <IonList inset={true} className='teacher-card__container'>
                                <IonListHeader color="medium" className='teacher-list__header'>{t('specific.dashboard.videocall')}</IonListHeader>
                                <IonItem lines='full'>
                                <IonAvatar slot="start" className='teacher_avatar'>
                                    <img src={SupportTeacher} />
                                </IonAvatar>
                                <IonLabel>
                                    <h2 className='teacher-details'>Jose Tovar</h2>
                                    <h3 className='teacher-details'>{t('specific.dashboard.support')}</h3>
                                </IonLabel>
                                </IonItem>
                                <IonItem className='ion-padding-start'>
                                    <IonLabel className='ion-text-wrap rol-input__label'>{t('specific.dashboard.slot')}</IonLabel>
                                    <IonSelect interface="popover" name='time-slot'>
                                        <IonSelectOption value="admin">Thu-8 12:00</IonSelectOption>
                                        <IonSelectOption value="teacher">Fri-9 11:00</IonSelectOption>
                                        <IonSelectOption value="student">Wed-14 11:00</IonSelectOption>
                                        <IonSelectOption value="student">Tue-20 10:00</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                            </IonList>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonFab horizontal="end" vertical="bottom" slot="fixed" className="social-media__fab">
                    <IonFabButton color="light" /*size='small'*/ className='ion-padding-end ion-padding-top'>
                        <IonIcon icon={Arrow}></IonIcon>
                    </IonFabButton>
                    <IonFabList side="start" className='ion-padding-end ion-padding-top'>
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
            </IonContent>
            <IonFooter collapse='fade'>
                <IonToolbar>
                    <IonLabel className='footer-text ion-text-wrap extra-info ion-padding-start' style={{ fontSize: "small" }}>
                        {`© 2022 Marco García Koch, Inc. ${t('specific.dashboard.footer.rights')}. `} 
                        <a href="#">{t('specific.login.policy')}</a> {t('specific.login.and')} <a href="#">{t('specific.login.terms')}</a> {t('specific.login.use')}.
                        <p className='footer-attributions'>{t('specific.dashboard.footer.atributions')}</p>
                    </IonLabel>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
}

export default Dashboard;