import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonCol, IonRow, IonGrid  } from "@ionic/react";
import ReactMarkDown from "react-markdown";
import LessonMarkDown from "../../components/lessonMarkDown";


const WorkingArea: React.FC = () => {
    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Working Area</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonGrid>
                <IonRow>
                    <IonCol size="5" offset-4><LessonMarkDown></LessonMarkDown></IonCol>
                    <IonCol size="5" offset-4>ion-col</IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
        </IonPage>
      );
}



export default WorkingArea;