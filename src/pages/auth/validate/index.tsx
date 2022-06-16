import { useAuth, useQuery } from "../../../core/auth/auth.hook";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { IonText } from "@ionic/react";

const Validate: React.FC = () => {
    const { isAuth, validate, accountValidated } = useAuth();
    const query = useQuery();
    const history = useHistory();
    
    useEffect(() => {
        validate(query.get('token') || '');
    }, []);

    if (isAuth) { 
        // if already autheticated, it will redirect to main page
       history.push("/dashboard");
    }

    return (
        accountValidated ? (
                            <>
                                <IonText color="primary">
                                <h1>Congrats!! Your email has been validated successfull. You can already start your journey!</h1>
                                <Link to={'/login'}><IonText color="medium">Go to Login </IonText></Link>
                                </IonText>
                            </>
                        ) 
                        : 
                        (  
                            <>
                                <IonText color="primary">
                                <h1>Ooopss!! Something went wrong. Either service is not available at the moment or your account has already been validated.</h1>
                                <Link to={'/login'}><IonText color="medium">Go back to Login</IonText></Link>
                                </IonText>
                            </>  
                        )
    );
}



export default Validate;