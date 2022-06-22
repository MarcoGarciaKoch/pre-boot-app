import { IonTextarea } from "@ionic/react";

const CustomInput = ({ customInput, setCustomInput }: any) => {
  return (
      <IonTextarea
        rows={10}
        wrap="soft"
        value={customInput}
        onIonChange={(e) => setCustomInput(e.detail.value)}
        placeholder={`Custom input`}
      ></IonTextarea>
  );
};

export default CustomInput;