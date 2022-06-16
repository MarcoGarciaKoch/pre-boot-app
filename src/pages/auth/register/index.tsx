import { useAuth } from "../../../core/auth/auth.hook";
import { useEffect, useState } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonSelect, IonSelectOption, IonToolbar } from '@ionic/react';
import { IonItem, IonLabel, IonInput, IonTitle } from '@ionic/react';
import Key from '../../../assets/images/key-sharp.svg';
import { RegisterUser } from "./register.model";
import { useHistory } from "react-router-dom";
import { useQuery } from '../../../core/auth/auth.hook';


const Register: React.FC = () => {
    const { register, isAuth, validateEarlyStudent, studentKnownData } = useAuth();
    const [showEmailConfirm, updateShowEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [bootcamp, setBootcamp] = useState('');
    const [isValid, setIsValid] = useState(true);
    const history = useHistory();
    const query = useQuery();


   useEffect(() => {
        validateEarlyStudent(query.get('token')??'').then(r => setIsValid(r.ok));
        console.log(isValid);
    }, []);

        console.log(studentKnownData);
    
    const handleSubmit = (e:any) => {
        e.preventDefault();
        const user:RegisterUser = {
            name,
            lastname,
            email,
            password,
            bootcamp
        };
        register(user).then(() => updateShowEmail(true));
    }

    if (isAuth) { 
        // Redirect to the /dashboard page when we are already registered and logged in.
        history.push("/dashboard");
    }

    
    return (
        isValid ?
        <IonPage /*className={ styles.loginPage }*/>
			<IonHeader>
                <IonToolbar>
                    <IonTitle>Create a new account</IonTitle>
                </IonToolbar>
            </IonHeader>
			<IonContent fullscreen>
                <IonGrid className="ion-padding">
                    {showEmailConfirm ?
                    <IonRow>
                        <IonCol>
                            <IonLabel position="floating"> We have sent you an email, please check your mailbox to validate your account</IonLabel>
                        </IonCol>
                    </IonRow>
                    : ''}
                    <IonRow>
                        <IonCol>
                            <IonIcon
                            style={{ fontSize: "120px", color: "#0040ff" }}
                            icon={Key}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                            <IonLabel position="floating"> Name</IonLabel>
                            <IonInput
                                type="text"
                                name='name'
                                placeholder="Enter your name"
                                onIonChange={(e:any) => setName(e.target.value)}
                                >
                            </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                            <IonLabel position="floating"> Lastname</IonLabel>
                            <IonInput
                                type="text"
                                name='lastname'
                                placeholder="Enter your lastname"
                                onIonChange={(e:any) => setLastname(e.target.value)}
                                >
                            </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                            <IonLabel position="floating"> Email</IonLabel>
                            <IonInput
                                type="email"
                                name='email'
                                placeholder="email"
                                >
                            </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                            <IonLabel position="floating"> Password</IonLabel>
                            <IonInput
                                type="password"
                                name='password'
                                placeholder="Enter your password"
                                onIonChange={(e:any) => setPassword(e.target.value)}
                                >
                            </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel>Your bootcamp</IonLabel>
                                <IonInput
                                type="text"
                                name='bootcamp'
                                placeholder="bootcamp"
                                >
                            </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton expand="block" onClick={handleSubmit}>Register</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
			</IonContent>
		</IonPage>
        :
        <IonPage /*className={ styles.loginPage }*/>
			<IonHeader>
                <IonToolbar>
                    <IonTitle>Something went wrong and we can not process your petition</IonTitle>
                </IonToolbar>
            </IonHeader>
        </IonPage>
    )
}


export default Register;