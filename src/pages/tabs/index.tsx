import { Redirect, Route } from 'react-router-dom';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import Home from '../../assets/images/home-outline.svg';
import Work from '../../assets/images/code-working-outline.svg';
import Video from '../../assets/images/videocam-outline.svg';
import Dashboard from './tab1/dashboard';
import Tab2 from '../tabs/tab2/Tab2';
import Tab3 from '../tabs/tab3/Tab3';

const Tabs: React.FC = () => {


    return (
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/" render={() => <Redirect to="/dashboard"/>}/>
          <Route exact path="/tabs/dashboard" component={Dashboard}/>
          <Route exact path="/tabs/tab2" component={Tab2}/>
          <Route exact path="/tabs/tab3" component={Tab3}/>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="dashboard" href="/tabs/dashboard">
            <IonIcon icon={Home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tabs/tab2">
            <IonIcon icon={Work} />
            <IonLabel>Working area</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tabs/tab3">
            <IonIcon icon={Video} />
            <IonLabel>Meeting room</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    );
};

export default Tabs;