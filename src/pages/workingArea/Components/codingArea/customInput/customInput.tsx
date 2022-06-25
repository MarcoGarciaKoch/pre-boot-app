import { IonTextarea } from "@ionic/react";
import './style.css';

const CustomInput = ({ customInput, setCustomInput }: any) => {
  return (
      <IonTextarea
        className='custom-input'
        name="ENTER"
        rows={3}
        autoGrow={true}
        wrap="soft"
        value={customInput}
        onIonChange={(e) => setCustomInput(e.detail.value)}
        placeholder='Custom input'
      ></IonTextarea>
  );
};

export default CustomInput;