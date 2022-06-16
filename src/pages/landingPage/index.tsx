import { IonHeader, IonImg, IonPage, IonToolbar, IonIcon, IonToggle, IonItem, 
         IonContent, IonButton, IonLabel, IonInput, IonGrid, IonRow, IonCol } from "@ionic/react";
import './style.css';
import { useState } from "react";
import { usePotentialClient } from '../../core/potentialClient/potentialClient.hook';
import { useTranslation } from 'react-i18next';
import PreBoot from '../../assets/images/pre-boot-logo.png';
import { useHistory } from "react-router-dom";

const LandingPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const { moreInfoClient } = usePotentialClient();
    const [t, i18n] = useTranslation('translation');
    const history = useHistory();

    const handleGetMoreInfo = (e:any) => {
        e.preventDefault();
        const potentialClient = {
            //data from the landing page with email from potential client
            email: email,
        };
        
        setEmail('');
        moreInfoClient(potentialClient)
                .then(r => r ? history.push(`/early-student-register?email=${email}`) : '');
    }

    return (
       <IonPage>
           <IonHeader>
               <IonToolbar>
                <IonItem lines="none">
                    <IonImg src={PreBoot} alt="pre-boot-logo" />
                    <IonButton onClick={() => i18n.changeLanguage("es")} slot="end">ES</IonButton>
                    <IonButton onClick={() => i18n.changeLanguage("en")} slot="end" >EN</IonButton>
                </IonItem>
               </IonToolbar>
           </IonHeader>
           <IonContent fullscreen className="background">
            <IonGrid>
            <IonRow>
                <IonCol>
                <IonItem>
                <IonLabel position="stacked">{t('specific.landing.email.title')}</IonLabel>
                <IonInput 
                    placeholder={t('specific.landing.email.placeholder')}
                    onIonChange={(e:any) => setEmail(e.target.value)}
                    value={email}
                    >
                </IonInput>
                <IonButton onClick={handleGetMoreInfo}>{t('specific.landing.email.button')}</IonButton>
                </IonItem>
                </IonCol>
            </IonRow>

            </IonGrid>
           </IonContent>
       </IonPage>
    )
};

export default LandingPage;
