import { useEarlyStudentAuth } from '../../core/earlyStudentAuth/earlyStudentAuth.hook';
import { useEffect, useState } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonSelect, IonSelectOption, IonToolbar } from '@ionic/react';
import { IonItem, IonLabel, IonInput, IonTitle } from '@ionic/react';
import Key from '../../assets/images/key-sharp.svg';
import { EarlyStudent } from './earlyStudentRegister.model';
import { useQuery } from "../../core/earlyStudentAuth/earlyStudentAuth.hook";


const EarlyStudentRegister: React.FC = () => {
    const { register, getCourses } = useEarlyStudentAuth();
    const [showRegistration, updateShowRegistration] = useState(false);
    const [email, setEmail] = useState('');
    const [bootcamp, setBootcamp] = useState('');
    const [role, setRole] = useState('');
    const query = useQuery();
    


    useEffect(() => {
        getCourses(query.get('email')?? '').then(r => console.log(r));
    }, []);
    

    //The company pre-registers the student in the DDBB
    const handleSubmit = (e:any) => {
        e.preventDefault();
        const student:EarlyStudent = {
            email,
            role,
            course: bootcamp
        };
        setEmail('');
        setBootcamp('');
        register(student).then(() => updateShowRegistration(true));
    }
    
    return (
        <IonPage /*className={ styles.loginPage }*/>
			<IonHeader>
                <IonToolbar>
                    <IonTitle>Register a New Student</IonTitle>
                </IonToolbar>
            </IonHeader>
			<IonContent fullscreen>
                <IonGrid className="ion-padding">
                    {showRegistration ?
                    <IonRow>
                        <IonCol>
                            <IonLabel position="floating">Student Registered Successfully</IonLabel>
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
                            <IonLabel position="floating"> Email</IonLabel>
                            <IonInput
                                type="email"
                                name='email'
                                placeholder="Enter your email"
                                onIonChange={(e:any) => setEmail(e.target.value)}
                                value={email}
                                >
                            </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                        <IonItem>
                            <IonLabel>Select user rol</IonLabel>
                            <IonSelect interface="popover" name='role' onIonChange={(e:any) => setRole(e.target.value)}>
                                <IonSelectOption value="admin">Admin</IonSelectOption>
                                <IonSelectOption value="teacher">Teacher</IonSelectOption>
                                <IonSelectOption value="student">Student</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                            <IonLabel position="floating"> Bootcamp</IonLabel>
                            <IonInput
                                type="text"
                                name='bootcamp'
                                placeholder="Enter the ID of the bootcamp"
                                onIonChange={(e:any) => setBootcamp(e.target.value)}
                                value={bootcamp}
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
    )
}


export default EarlyStudentRegister;