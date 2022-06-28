import { IonTitle, IonItem, IonLabel } from "@ionic/react";
import './style.css';
import { useTranslation } from 'react-i18next';


const OutputWindow = ({ outputDetails }: any) => {
    const [t, i18n] = useTranslation('translation');
    
    const getOutput = () => {
      let statusId = outputDetails?.status?.id;

        switch (statusId) {
            case 6: 
                return (
                    <pre className="output-message-style">
                    {atob(outputDetails?.compile_output)}
                    </pre>
                )
            
            case 3: 
                return (
                    <pre className="output-message-style">
                        {atob(outputDetails.stdout) !== null
                        ? `${atob(outputDetails.stdout)}`
                        : null}
                    </pre>
                )

            case 5:
                return (
                    <pre className="output-message-style">
                    {`Time Limit Exceeded`}
                    </pre>
                )
            
            default:
                return (
                    <pre className="output-message-style">
                    {atob(outputDetails?.stderr)}
                    </pre>
                )
        }
    };


    return (
        <>
          <IonLabel color="dark" className="ion-padding-top output-title">
          {t('specific.workingArea.result')}
          </IonLabel>
          <div className="output-content-style">
            {outputDetails ? <>{getOutput()}</> : null}
          </div>
          </>
    );
  };
  
  export default OutputWindow;