import { IonTitle, IonItem } from "@ionic/react";




const OutputWindow = ({ outputDetails }: any) => {
    
    const getOutput = () => {
      let statusId = outputDetails?.status?.id;

        switch (statusId) {
            case 6: 
                return (
                    <pre className="px-2 py-1 font-normal text-xs text-red-500">
                    {/* {atob(outputDetails?.compile_output)} */}
                    </pre>
                )
            
            case 3: 
                return (
                    <pre className="px-2 py-1 font-normal text-xs text-green-500">
                        {/* {atob(outputDetails.stdout) !== null
                        ? `${atob(outputDetails.stdout)}`
                        : null} */}
                    </pre>
                )

            case 5:
                return (
                    <pre className="px-2 py-1 font-normal text-xs text-red-500">
                    {`Time Limit Exceeded`}
                    </pre>
                )
            
            default:
                return (
                    <pre className="px-2 py-1 font-normal text-xs text-red-500">
                    {/* {atob(outputDetails?.stderr)} */}
                    </pre>
                )
        }
    };


    return (
      <IonItem lines="none" className="ion-margin-bottom">
        <IonTitle className="ion-padding-top">
          Output
        </IonTitle>
        <IonItem lines="none">
          {outputDetails ? <>{getOutput()}</> : null}
        </IonItem>
      </IonItem>
    );
  };
  
  export default OutputWindow;