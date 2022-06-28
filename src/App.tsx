import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonPage, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/auth/login/index';
import Register from './pages/auth/register/index';
import ConfirmEmail from './pages/confirmEmail/index';
import Validate from './pages/auth/validate/index';
import LandingPage from './pages/landingPage/index';
import EarlyStudentRegister from './pages/earlyStudentRegister/index';
import WorkingArea from './pages/workingArea/index';
import Tabs from './pages/tabs/index';
import NotFound from './pages/notFound/index';
import Dashboard from './pages/dashboard';
import ChatProvider from './context/Chat/chat.provider';
import CourseStudentDataProvider from './context/CourseStudentData/courseStudentData.provider'

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
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route exact path="/landing" component={LandingPage} />
        <Route exact path="/early-student-register" component={EarlyStudentRegister} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/confirm-email" component={ConfirmEmail} />
        <Route exact path="/validate" component={Validate} />
        <Route exact path="/login" component={Login} />
        <Route path="/demo" ><IonPage><h1>Hello</h1></IonPage></Route>
        <Route path="/student">
          <IonPage>
            <CourseStudentDataProvider>
              <ChatProvider>
                <IonRouterOutlet>
                  <Route path='/student/dashboard'>
                    <Dashboard></Dashboard>
                  </Route>
                  <Route path='/student/working-area/:id'>
                    <WorkingArea></WorkingArea>
                  </Route>
                  <Route>
                    <NotFound />
                  </Route>
                </IonRouterOutlet>
              </ChatProvider>
            </CourseStudentDataProvider>
          </IonPage>
        </Route>
        <Route exact path="/tabs" component={Tabs} />
        <Route>
          <NotFound />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
