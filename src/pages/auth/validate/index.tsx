import { useAuth } from '../../../core/auth/auth.hook';
import {Link, useHistory, useLocation } from "react-router-dom";
import { IonContent, IonPage, IonText, useIonViewWillEnter, IonGrid, IonRow, IonCol, IonImg, IonLabel } from "@ionic/react";
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
                            <IonContent fullscreen className="background-validate">
                                <IonGrid>
                                    <IonRow className="ion-justify-content-center">
                                        <IonCol sizeXs='12' sizeSm='10' sizeMd='8' sizeLg='7' sizeXl='4'>
                                            <IonImg src={Obama} alt="pre-boot-logo" className="obama_gif"/>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow className="ion-justify-content-center">
                                        <IonCol sizeXs='7' sizeSm='6' sizeMd='5' sizeLg='4' sizeXl='4'>
                                            <IonLabel className='ion-text-wrap message-one'> Congrats!! Your email has been validated successfully.</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow className="ion-justify-content-center">
                                        <IonCol sizeXs='7' sizeSm='6' sizeMd='5' sizeLg='4' sizeXl='3'>
                                            <IonLabel className='ion-text-wrap message-two'>You can already login and start your course!</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow className="ion-justify-content-center">
                                        <IonCol sizeXs='12' sizeSm='10' sizeMd='10' sizeLg='10' sizeXl='10'>
                                        <Link className='link-to-login' to={'/login'}><IonText className='text-login ion-padding-start' color="medium">Go to Login</IonText></Link>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonContent>   
                        ) 
                        : 
                        (  
                            <IonContent fullscreen className="background-validate">
                                <IonGrid>
                                    <IonRow className="ion-justify-content-center">
                                        <IonCol sizeXs='12' sizeSm='10' sizeMd='10' sizeLg='12' sizeXl='12'>
                                            <IonImg src={Alert} alt="pre-boot-logo" className="alert__image"/>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow className="ion-justify-content-center">
                                        <IonCol sizeXs='7' sizeSm='6' sizeMd='5' sizeLg='4' sizeXl='2'>
                                            <IonLabel className='ion-text-wrap message-one'>Ooopss!! Something went wrong.</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow className="ion-justify-content-center">
                                        <IonCol sizeXs='10' sizeSm='9' sizeMd='8' sizeLg='8' sizeXl='4'>
                                            <IonLabel className='ion-text-wrap message-two'>Either service is not available at the moment or your account has already been validated.</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow className="ion-justify-content-center">
                                        <IonCol sizeXs='12' sizeSm='10' sizeMd='10' sizeLg='10' sizeXl='10'>
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