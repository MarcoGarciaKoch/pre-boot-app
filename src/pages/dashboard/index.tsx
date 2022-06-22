import { useIonViewWillEnter, IonHeader, IonPage, IonToolbar, IonItem, IonImg, IonTitle, IonIcon, IonToggle, IonButton, 
        IonContent, IonGrid, IonRow, IonCol, IonList, IonListHeader, IonAvatar, IonLabel, IonFooter, IonProgressBar } from '@ionic/react';
import './style.css';
import PreBoot from '../../assets/images/pre-boot-logo.png';
import { useTranslation } from 'react-i18next';
import { moon } from 'ionicons/icons';
import Sun from '../../assets/images/sunny-outline.svg';
import UserAvatar from '../../assets/images/avatar-bigote-chino.png';
import Barbudo from '../../assets/images/barbudo-avatar.png';
import Trenzas from '../../assets/images/trenzas-avatar.png';
import Miyagi from '../../assets/images/miyagi-avatar.png';
import Chica from '../../assets/images/chica-avatar.png';
import Nido from '../../assets/images/nido-avatar.png';
import LogOut from '../../assets/images/logout.png';
import { useHistory } from "react-router-dom";
import { AUTH_STORAGE_KEY } from "../../core/auth/auth.utils";
import { useAuth } from '../../core/auth/auth.hook';
import { useUser } from '../../core/users/user.hook';
import Lesson from './components/index'


const Dashboard: React.FC = () => {
    const [t, i18n] = useTranslation('translation');
    const toggleDarkModeHandler = () => document.body.classList.toggle('dark');
    const history = useHistory();
    const { isAuth } = useAuth();
    const { userCourseData} = useUser()

    useIonViewWillEnter(() => {
        if (!isAuth) { 
            // Redirect to the /dashboard page when we are already logged in.
            history.push("/login");
        }
    }, []/*depdendency array*/);


    const logOut = () => {
        sessionStorage.removeItem(AUTH_STORAGE_KEY);
        if (sessionStorage.getItem(AUTH_STORAGE_KEY) === null) {
            // after login, it will redirect to dashboard page
            history.push("/login"); 
        } 
    }

    const calcProgress = () => {
        const IdLesson = userCourseData.student.course.progress;
        const findLesson = userCourseData.course.lessons.find(l => l.id === IdLesson);
        const currentLesson = findLesson?.order;
        const totalLessons = userCourseData.course.lessons.length;
        if (currentLesson !== undefined) {
            const result = ((currentLesson * 100) / totalLessons);
            return result;
        }
    }



    console.log(userCourseData)

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
            <IonContent fullscreen className='dashborad-content-background' scrollY={false}>
                <IonItem className='user-info__bar'>
                    <IonAvatar slot="start">
                        <img src={UserAvatar} />
                    </IonAvatar>
                    <IonTitle slot='start'>Welcome {userCourseData.student.name}</IonTitle>
                        <IonTitle slot='start'>Progress:</IonTitle>
                        <IonProgressBar slot='start' className='progress-bar' value={0.1} buffer={0.3}></IonProgressBar>
                        <IonTitle>{calcProgress()}%</IonTitle>
                </IonItem>
                <IonGrid>
                    <IonRow>
                        <IonCol size='4'>
                            {/* <IonVirtualScroll > */}
                            <IonList inset={true} lines='inset' className='lesson-list__container'>
                                <IonListHeader> LESSONS </IonListHeader>
                                {userCourseData?.course.lessons.map((l, i) => <Lesson key={i} lesson={l} userCourseData={userCourseData}></Lesson>)}
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
                                <IonItem>
                                <IonAvatar slot="start">
                                    <img src={UserAvatar} />
                                </IonAvatar>
                                <IonLabel>
                                    <h2>Marco Garcia</h2>
                                    <h3>Yeeehh que pasa colegas, ¿Cómo va todo?</h3>
                                </IonLabel>
                                </IonItem>
                                <IonItem>
                                <IonAvatar slot="start">
                                    <img src={Barbudo} />
                                </IonAvatar>
                                <IonLabel>
                                    <h2>Alberto Aroca</h2>
                                    <h3>Pues hasta la polla, ¿nos vamos de cañas?</h3>
                                </IonLabel>
                                </IonItem>
                                <IonItem>
                                <IonAvatar slot="start">
                                    <img src={Trenzas} />
                                </IonAvatar>
                                <IonLabel>
                                    <h2>Laura Lagares</h2>
                                    <h3>Iyoooo, ¿dónde esta Jozeeeee que no me ayuda? Estoy mu agobiá</h3>
                                </IonLabel>
                                </IonItem>
                                <IonItem>
                                <IonAvatar slot="start">
                                    <img src={Miyagi} />
                                </IonAvatar>
                                <IonLabel>
                                    <h2>Bryan de Santiago</h2>
                                    <h3>Si vais mañana de cañas me apunto, mañana voy seguro a clase</h3>
                                </IonLabel>
                                </IonItem>
                                <IonItem>
                                <IonAvatar slot="start">
                                    <img src={Chica} />
                                </IonAvatar>
                                <IonLabel>
                                    <h2>Judith Prieto</h2>
                                    <h3>Yo voy mañana también a la comida, hoy trabajo en el cine</h3>
                                </IonLabel>
                                </IonItem>
                                <IonItem>
                                <IonAvatar slot="start">
                                    <img src={Nido} />
                                </IonAvatar>
                                <IonLabel>
                                    <h2>Victor Martin</h2>
                                    <h3>Chicos yo pongo el vino y el networking, que he conocido dos polacas</h3>
                                </IonLabel>
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