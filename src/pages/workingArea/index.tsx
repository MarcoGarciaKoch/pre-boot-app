import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonCol, IonRow, 
         IonGrid, IonIcon, IonToggle, IonButton, IonImg, IonFooter } from "@ionic/react";
import LessonMarkDown from "./Components/lessonMarkDown";
import './style.css';
import Sun from '../../assets/images/sunny-outline.svg';
import { moon } from 'ionicons/icons';
import LogOut from '../../assets/images/logout.png';
import PreBoot from '../../assets/images/pre-boot-logo.png';
import { useTranslation } from 'react-i18next';
import { AUTH_STORAGE_KEY } from "../../core/auth/auth.utils";
import { useHistory, useParams } from "react-router-dom";
import Landing from "./Components/codingArea/landing";


const WorkingArea: React.FC = () => {
    const [t, i18n] = useTranslation('translation');
    const toggleDarkModeHandler = () => document.body.classList.toggle('dark');
    const history = useHistory();
    const id  = useParams();


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
                    <IonCol size="5" offset-4><Landing></Landing></IonCol>
                </IonRow>
            </IonGrid>
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