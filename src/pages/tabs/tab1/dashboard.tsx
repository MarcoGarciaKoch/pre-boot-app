import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonIcon, IonLabel, IonToggle } from '@ionic/react';
import './style.css';
import { moon } from 'ionicons/icons';
import Sun from '../../../assets/images/sunny-outline.svg';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../core/users/user.hook';


const Dashboard: React.FC = () => {
  const [t] = useTranslation('translation');
  const toggleDarkModeHandler = () => document.body.classList.toggle('dark');
  const { user, progress } = useUser();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('general.tab.header.title')}</IonTitle>
          <IonItem lines="none">
            <IonIcon slot="end" icon={Sun} />
            <IonToggle slot="end" name="darkMode" onIonChange={toggleDarkModeHandler} />
            <IonIcon slot="end" icon={moon} />
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
