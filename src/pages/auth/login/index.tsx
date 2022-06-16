import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonToolbar, IonItem, IonLabel, IonInput, IonTitle } from '@ionic/react';
import { useAuth } from "../../../core/auth/auth.hook";
import { personCircle } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
    const { isAuth, login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

if (isAuth) { 
    // Redirect to the /dashboard page when we are already logged in.
    history.push("/dashboard");
}   

const handleLogin = (e: any) => {
                e.preventDefault();
                const user = {
                    // 
                    email: email,
                    password: password
                };
                login(user);
                if(isAuth) history.push("/dashboard"); // after login, it will redirect to tab1
    }

	return (
		<IonPage /*className={ styles.loginPage }*/>
			<IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
			<IonContent fullscreen>
                <IonGrid className="ion-padding">
                    <IonRow>
                        <IonCol>
                            <IonIcon
                            style={{ fontSize: "120px", color: "#0040ff" }}
                            icon={personCircle}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                            <IonLabel position="floating"> Email</IonLabel>
                            <IonInput
                                type="email"
                                name='email'
                                placeholder="Enter your email"
                                onIonChange={(e:any) => setEmail(e.target.value)}
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
                            <p style={{ fontSize: "small" }}>
                            By clicking LOGIN you agree to our <a href="#">Policy</a> and <a href="#">Terms</a> of Use.
                            </p>
                            <IonButton expand="block" onClick={handleLogin}>
                            Login
                            </IonButton>
                            <p style={{ fontSize: "small" }}>
                            Don't have an account? <a href="/register">Sign up!</a>
                            </p>
                        </IonCol>
                    </IonRow>
                </IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Login;

