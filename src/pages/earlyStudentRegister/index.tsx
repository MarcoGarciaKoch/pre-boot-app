import { useEarlyStudentAuth } from '../../core/earlyStudentAuth/earlyStudentAuth.hook';
import { useState } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonImg, IonSelect, 
         IonSelectOption, IonToolbar, useIonViewWillEnter, IonToggle} from '@ionic/react';
import { IonItem, IonLabel, IonInput, IonTitle } from '@ionic/react';
import { EarlyStudent } from './earlyStudentRegister.model';
import { useQuery } from "../../core/earlyStudentAuth/earlyStudentAuth.hook";
import { useLocation } from 'react-router-dom';
import PreBoot from '../../assets/images/pre-boot-logo.png';
import { useTranslation } from 'react-i18next';
import { moon } from 'ionicons/icons';
import Sun from '../../assets/images/sunny-outline.svg';
import RegisterLogo from '../../assets/images/register-early-student.png';
import './style.css';
import { useHistory } from "react-router-dom";


const EarlyStudentRegister: React.FC = () => {
    const { register, getCourses } = useEarlyStudentAuth();
    const [email, setEmail] = useState('');
    const [bootcamp, setBootcamp] = useState('');
    const [role, setRole] = useState('');
    const [courseList, setCourseList] = useState<any[]>([]);
    const query = useQuery();
    const location = useLocation();
    const [t, i18n] = useTranslation('translation');
    const toggleDarkModeHandler = () => document.body.classList.toggle('dark');
    const [dark, setDark] = useState(false);
    const history = useHistory();
    

    useIonViewWillEnter(() => {
        getCourses(query.get('email')?? '').then(r => setCourseList(r));
    }, [location]/*depdendency array*/);


    //The company pre-registers the student in the DDBB
    const handleSubmit = (e:any) => {
        e.preventDefault();
        const student:EarlyStudent = {
            email,
            role,
            course: bootcamp
        };
        setEmail('');
        setBootcamp('');
        register(student).then(() =>  history.push("/invitation-sent"));
    }
    
    return (
        <IonPage>
			<IonHeader>
                <IonToolbar>
                    <IonItem lines='none'>
                        <IonImg src={PreBoot} alt="pre-boot-logo" className="header__logo"/>
                        <IonTitle className="header__title">PRE-BOOT</IonTitle>
                    </IonItem>
                    <IonIcon slot="end" icon={Sun}/>
                    <IonToggle slot="end" name="darkMode" onIonChange={toggleDarkModeHandler} onClick={() => setDark(!dark)}/>
                    <IonIcon slot="end" icon={moon} className="ion-padding-end"/>
                    <IonButton size='small' className="es-button__language ion-padding-start" onClick={() => i18n.changeLanguage("es")} slot="end">ES</IonButton>
                    <IonButton size='small' className="en-button__language ion-padding-end" onClick={() => i18n.changeLanguage("en")} slot="end" >EN</IonButton>
                </IonToolbar>
            </IonHeader>
			<IonContent fullscreen scrollY={false} className={dark ? 'dark-content-background' : 'light-content-background'}>
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size='1' sizeXs='2' sizeSm='1' sizeMd='1'>
                           <IonImg src={RegisterLogo} alt="register-logo" className="register__logo"/>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol sizeXs='8' sizeSm='7' sizeMd='6' sizeLg='5' sizeXl='4' >
                                <IonTitle className={`form-title ion-padding-start ${dark ? '' : 'title-text-light'}`}>{t('specific.early-student-register.title')}</IonTitle>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol sizeXs='8' sizeSm='7' sizeMd='6' sizeLg='5' sizeXl='4'>
                            <IonItem>
                            <IonLabel position="floating">{t('specific.early-student-register.email')}</IonLabel>
                            <IonInput
                                type="email"
                                name='email'
                                placeholder={t('specific.early-student-register.email-placeholder')}
                                onIonChange={(e:any) => setEmail(e.target.value)}
                                value={email}
                                >
                            </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol sizeXs='8' sizeSm='7' sizeMd='6' sizeLg='5' sizeXl='4'>
                        <IonItem>
                            <IonLabel>{t('specific.early-student-register.role')}</IonLabel>
                            <IonSelect interface="popover" name='role' onIonChange={(e:any) => setRole(e.target.value)}>
                                <IonSelectOption value="admin">Admin</IonSelectOption>
                                <IonSelectOption value="teacher">Teacher</IonSelectOption>
                                <IonSelectOption value="student">Student</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol sizeXs='8' sizeSm='7' sizeMd='6' sizeLg='5' sizeXl='4'>
                        <IonItem>
                            <IonLabel>{t('specific.early-student-register.course')}</IonLabel>
                            <IonSelect interface="popover" name='course' onIonChange={(e:any) => setBootcamp(e.target.value)}>
                                {courseList.map((c,i) => <IonSelectOption key={i} value={c._id}>{c.name}</IonSelectOption>)}
                            </IonSelect>
                        </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol sizeXs='6' sizeSm='5' sizeMd='4' sizeLg='3' sizeXl='2'>
                            <IonButton className='register__button' expand="block" onClick={handleSubmit}>{t('specific.early-student-register.button')}</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
			</IonContent>
            {/* <IonFooter>
                <IonToolbar>
                    <IonTitle>Footer</IonTitle>
                </IonToolbar>
            </IonFooter> */}
		</IonPage>
    )
}


export default EarlyStudentRegister;