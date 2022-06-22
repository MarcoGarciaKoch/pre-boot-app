import { useAuth } from '../../../core/auth/auth.hook';
import {Link, useHistory, useLocation } from "react-router-dom";
import { IonContent, IonPage, IonText, IonTitle, useIonViewWillEnter, IonGrid, IonRow, IonCol, IonImg } from "@ionic/react";
import { useQuery } from '../../../core/auth/auth.hook';
import './style.css';
import Alert from '../../../assets/images/alert.png';
import Obama from '../../../assets/images/tenor.gif';


const Validate: React.FC = () => {
    const { isAuth, validate, accountValidated } = useAuth();
    const query = useQuery();
    const history = useHistory();
    const location = useLocation();
    
    
    useIonViewWillEnter(() => {
        if (isAuth) { 
            // if already autheticated, it will redirect to main page
           history.push("/login");
        }
        
        validate(query.get('token')?? '');
    }, [location]/*depdendency array*/);

 

    return (
        <IonPage>
        {accountValidated ? (
                            <IonContent fullscreen className="background">
                                <IonGrid>
                                    <IonRow className="ion-justify-content-center">
                                        <IonCol size='7'>
                                            <IonImg src={Obama} alt="pre-boot-logo" className="obama_gif"/>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow className="ion-justify-content-center">
                                        <IonCol size='10'>
                                            <IonTitle className='message'> Congrats!! Your email has been validated successfully. You can already login and start your course!</IonTitle>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow className="ion-justify-content-center">
                                        <IonCol size='10'>
                                        <Link className='link-to-login' to={'/login'}><IonText className='text-login ion-padding-start' color="medium">Go to Login</IonText></Link>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonContent>   
                        ) 
                        : 
                        (  
                            <IonContent fullscreen className="background">
                                <IonGrid>
                                    <IonRow className="ion-justify-content-center">
                                        <IonCol size='4'>
                                            <IonImg src={Alert} alt="pre-boot-logo" className="alert__image"/>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow className="ion-justify-content-center">
                                        <IonCol size='10'>
                                            <IonTitle className='message'>Ooopss!! Something went wrong. Either service is not available at the moment or your account has already been validated.</IonTitle>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow className="ion-justify-content-center">
                                        <IonCol size='10'>
                                        <Link className='link-to-login' to={'/login'}><IonText className='text-login ion-padding-start' color="medium">Go back to Login</IonText></Link>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonContent>  
                        )}
        </IonPage>
    );
}



export default Validate;