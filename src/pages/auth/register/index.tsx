import { useAuth } from "../../../core/auth/auth.hook";
import { useState } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, 
         IonSelect, IonSelectOption, IonToolbar, useIonViewWillEnter, IonImg, IonToggle } from '@ionic/react';
import { IonItem, IonLabel, IonInput, IonTitle } from '@ionic/react';
import Key from '../../../assets/images/key-sharp.svg';
import { RegisterUser } from "./register.model";
import { useHistory } from "react-router-dom";
import { useQuery } from '../../../core/auth/auth.hook';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sun from '../../../assets/images/sunny-outline.svg';
import { moon } from 'ionicons/icons';
import PreBoot from '../../../assets/images/pre-boot-logo.png';
import RegisterUserLogo from '../../../assets/images/register-user.png';
import './style.css';


const Register: React.FC = () => {
    const { register, isAuth, validateEarlyStudent } = useAuth();
    const [showEmailConfirm, updateShowEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [studentKnownData, setStudentKnownData] = useState({email: 'email', bootcamp: 'bootcamp'});
    const history = useHistory();
    const query = useQuery();
    const location = useLocation();
    const toggleDarkModeHandler = () => document.body.classList.toggle('dark');
    const [t, i18n] = useTranslation('translation');


    useIonViewWillEnter(() => {
        if (isAuth) { 
            // Redirect to the /dashboard page when we are already registered and logged in.
            history.push("/login");
        }
    
        validateEarlyStudent(query.get('token')??'').then(r => setStudentKnownData(r));
    }, [location]/*depdendency array*/);

    
    const handleSubmit = (e:any) => {
        e.preventDefault();
        console.log(studentKnownData)
        const user:RegisterUser = {
            name,
            lastname,
            email: studentKnownData.email,
            password,
            bootcamp: studentKnownData.bootcamp,
        };
        register(user).then(() => updateShowEmail(true));
    }

    
    return (
        <IonPage /*className={ styles.loginPage }*/>
			<IonHeader>
                <IonToolbar>
                    <IonItem lines="none">
                        <IonImg src={PreBoot} alt="pre-boot-logo" className="header__logo"/>
                        <IonTitle className="header__title">PRE-BOOT</IonTitle>
                    </IonItem>
                    <IonIcon slot="end" icon={Sun} />
                    <IonToggle slot="end" name="darkMode" onIonChange={toggleDarkModeHandler} />
                    <IonIcon slot="end" icon={moon} className="ion-padding-end"/>
                    <IonButton size='small' className="es-button__language ion-padding-start" onClick={() => i18n.changeLanguage("es")} slot="end">ES</IonButton>
                    <IonButton size='small' className="en-button__language ion-padding-end" onClick={() => i18n.changeLanguage("en")} slot="end" >EN</IonButton>
                </IonToolbar>
            </IonHeader>
			<IonContent fullscreen className='content-background'>
                <IonGrid className="ion-padding">
                    {showEmailConfirm ?
                    <IonRow>
                        <IonCol>
                            <IonTitle className="registered-message">{t('specific.register.registered-message')}</IonTitle>
                        </IonCol>
                    </IonRow>
                    : ''}
                    <IonRow className="ion-justify-content-center">
                        <IonCol size='1'>
                           <IonImg src={RegisterUserLogo} alt="register-user-logo" className="register-user__logo"/>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol  size='4'>
                            <IonItem>
                            <IonLabel position="floating">{t('specific.register.name')}</IonLabel>
                            <IonInput
                                type="text"
                                name='name'
                                placeholder={t('specific.register.name-placeholder')}
                                onIonChange={(e:any) => setName(e.target.value)}
                                >
                            </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow >
                    <IonRow className="ion-justify-content-center">
                        <IonCol  size='4'>
                            <IonItem>
                            <IonLabel position="floating">{t('specific.register.lastname')}</IonLabel>
                            <IonInput
                                type="text"
                                name='lastname'
                                placeholder={t('specific.register.lastname-placeholder')}
                                onIonChange={(e:any) => setLastname(e.target.value)}
                                >
                            </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol  size='4'>
                            <IonItem>
                            <IonLabel position="floating" >{t('specific.register.email')}</IonLabel>
                            <IonInput
                                disabled
                                type="email"
                                name='email'
                                value={studentKnownData.email}
                                >
                            </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol  size='4'>
                            <IonItem>
                            <IonLabel position="floating">{t('specific.register.password')}</IonLabel>
                            <IonInput
                                type="password"
                                name='password'
                                placeholder={t('specific.register.password-placeholder')}
                                onIonChange={(e:any) => setPassword(e.target.value)}
                                >
                            </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol  size='4'>
                            <IonItem>
                                <IonLabel position="floating">{t('specific.register.course')}</IonLabel>
                                <IonInput
                                disabled
                                type="text"
                                name='bootcamp'
                                value={studentKnownData.bootcamp}
                                >
                            </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size='4'>
                            <IonButton className='register__button' expand="block" onClick={handleSubmit}>{t('specific.register.button')}</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
			</IonContent>
		</IonPage>
    )
}


export default Register;