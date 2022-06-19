import { IonHeader, IonImg, IonPage, IonToolbar, IonIcon, IonItem, IonCard, IonCardContent,
         IonContent, IonButton, IonLabel, IonInput, IonGrid, IonRow, IonCol, IonTitle, IonBadge } from "@ionic/react";
import './style.css';
import { useState } from "react";
import { usePotentialClient } from '../../core/potentialClient/potentialClient.hook';
import { useTranslation } from 'react-i18next';
import PreBoot from '../../assets/images/pre-boot-logo.png';
import { RouteComponentProps } from "react-router-dom";




const LandingPage: React.FC<RouteComponentProps> = ({history}) => {
    const [email, setEmail] = useState('');
    const { moreInfoClient } = usePotentialClient();
    const [t, i18n] = useTranslation('translation');

    
    const handleGetMoreInfo = (e:any) => {
        e.preventDefault();
        const potentialClient = {
            //data from the landing page with email from potential client
            email: email,
        };
        
        setEmail('');
        moreInfoClient(potentialClient)
                .then(r => r ? history.push({
                    pathname: '/early-student-register',
                    search: `?email=${email}`,  // query string
                    state: {  // location state
                    update: true, 
                    }
                }) : '');
    }

    return (
       <IonPage>
           <IonHeader>
               <IonToolbar>
                    <IonItem lines="none">
                        <IonImg src={PreBoot} alt="pre-boot-logo" className="header__logo"/>
                        <IonTitle className="header__title">PRE-BOOT</IonTitle>
                    </IonItem>
                    <IonButton size='small' className="es-button__language" onClick={() => i18n.changeLanguage("es")} slot="end">ES</IonButton>
                    <IonButton size='small' className="en-button__language" onClick={() => i18n.changeLanguage("en")} slot="end" >EN</IonButton>
               </IonToolbar>
           </IonHeader>
           <IonContent fullscreen className="content-background">
            <IonItem className="ion-align-items-center info-main__container" >
            <IonGrid>
                <IonRow className="ion-justify-content-around">
                    <IonCol size="12">
                        <IonTitle className="title-main-info ion-text-sm-wrap">{t('specific.landing.banner-title')}</IonTitle>
                    </IonCol>
                </IonRow>
                <IonRow className="ion-justify-content-evenly">
                    <IonCol size="6" sizeXs="12" sizeSm="10" sizeMd="8" sizeLg="4" sizeXl="4">
                        <IonCard className="card-background">
                            <IonItem className="card-header__container">
                                <IonBadge className="ion-margin-end badge" color="primary">1</IonBadge>
                                <IonLabel className="card-title">{t('specific.landing.card-one.title')}</IonLabel>
                            </IonItem>

                            <IonCardContent className="ion-text-wrap">
                                {t('specific.landing.card-one.content')}
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                    <IonCol size="6" sizeXs="12" sizeSm="10" sizeMd="8" sizeLg="4" sizeXl="4">
                        <IonCard className="card-background">
                            <IonItem className="card-header__container">
                                <IonBadge className="ion-margin-end badge" color="primary">2</IonBadge>
                                <IonLabel className="card-title">{t('specific.landing.card-two.title')}</IonLabel>
                            </IonItem>

                            <IonCardContent>
                                {t('specific.landing.card-two.content')}
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                </IonRow>
                <IonRow className="ion-justify-content-evenly">
                    <IonCol size="6" sizeXs="12" sizeSm="10" sizeMd="8" sizeLg="4" sizeXl="4">
                        <IonCard className="card-background">
                            <IonItem className="card-header__container">
                                <IonBadge className="ion-margin-end badge" color="primary">3</IonBadge>
                                <IonLabel className="card-title">{t('specific.landing.card-three.title')}</IonLabel>
                            </IonItem>

                            <IonCardContent>
                                {t('specific.landing.card-three.content')}
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                    <IonCol size="6" sizeXs="12" sizeSm="10" sizeMd="8" sizeLg="4" sizeXl="4">
                    <IonCard className="card-background">
                        <IonItem className="card-header__container">
                            <IonBadge className="ion-margin-end badge" color="primary">4</IonBadge>
                            <IonLabel className="card-title">{t('specific.landing.card-four.title')}</IonLabel>
                        </IonItem>

                        <IonCardContent>
                            {t('specific.landing.card-four.content')}
                        </IonCardContent>
                    </IonCard>
                    </IonCol>
                </IonRow>
                <IonRow className="ion-justify-content-center">
                    <IonCol size="2" sizeXs="4">
                        <IonItem className="email__box">
                            <IonLabel className="email-title" position="stacked">{t('specific.landing.email.title')}</IonLabel>
                            <IonInput 
                                placeholder={t('specific.landing.email.placeholder')}
                                onIonChange={(e:any) => setEmail(e.target.value)}
                                value={email}
                                >
                            </IonInput>
                            <IonButton className="more-info__button ion-margin-bottom" onClick={handleGetMoreInfo}>{t('specific.landing.email.button')}</IonButton>
                        </IonItem>
                    </IonCol>
                </IonRow>
            </IonGrid>
            </IonItem>
           </IonContent>
       </IonPage>
    )
};

export default LandingPage;
