import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/auth/login/index';
import Register from './pages/auth/register/index';
import Validate from './pages/auth/validate/index';
import LandingPage from './pages/landingPage/index';
import EarlyStudentRegister from './pages/earlyStudentRegister/index';
import Tabs from './pages/tabs/index';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/" render={() => <Redirect to="/landing"/>} />
          <Route exact path="/landing" component={LandingPage} />
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/validate" component={Validate}/>
          <Route exact path="/early-student-register" component={EarlyStudentRegister}/>
          <Route exact path="/tabs" component={Tabs}></Route>
        </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
