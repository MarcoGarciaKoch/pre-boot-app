import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonToolbar, 
        IonItem, IonLabel, IonInput, IonTitle, IonImg, IonToggle, useIonViewDidEnter } from '@ionic/react';
import { useAuth } from "../../../core/auth/auth.hook";
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import './style.css';
import { useTranslation } from 'react-i18next';
import { moon } from 'ionicons/icons';
import PreBoot from '../../../assets/images/pre-boot-logo.png';
import Sun from '../../../assets/images/sunny-outline.svg';
import LoginLogo from '../../../assets/images/login-avatar.png';


const Login: React.FC = () => {
    const { isAuth, login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const [t, i18n] = useTranslation('translation');
    const toggleDarkModeHandler = () => document.body.classList.toggle('dark');
    
    

    useIonViewDidEnter(() => {
        if (isAuth) { 
            // Redirect to the /dashboard page when we are already logged in.
            history.push("/student/dashboard");
        }
    }, []/*depdendency array*/);


    const handleLogin = (e: any) => {
                    e.preventDefault();
                    const user = {
                        // 
                        email: email,
                        password: password
                    };
                    login(user);
                    if (isAuth) {
                        // after login, it will redirect to dashboard page
                        history.push("/student/dashboard"); 
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
                </IonToolbar>
            </IonHeader>
			<IonContent fullscreen className='content-background'>
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size='1'>
                            <IonImg src={LoginLogo} alt="login-logo" className="login__logo"></IonImg>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size='4'>
                            <IonItem>
                            <IonLabel position="floating">{t('specific.login.email')}</IonLabel>
                            <IonInput
                                type="email"
                                name='email'
                                placeholder={t('specific.login.email-placeholder')}
                                onIonChange={(e:any) => setEmail(e.target.value)}
                                >
                            </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size='4'>
                            <IonItem>
                            <IonLabel position="floating">{t('specific.login.password')}</IonLabel>
                            <IonInput
                                type="password"
                                name='password'
                                placeholder={t('specific.login.password-placeholder')}
                                onIonChange={(e:any) => setPassword(e.target.value)}
                                >
                            </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size='4'>
                            <p className='extra-info' style={{ fontSize: "small" }}>
                            {t('specific.login.extra-info')} <a href="#">{t('specific.login.policy')}</a> {t('specific.login.and')} <a href="#">{t('specific.login.terms')}</a> {t('specific.login.use')}.
                            </p>
                            <IonButton className='login__button' expand="block" onClick={handleLogin}>
                            Login
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Login;

