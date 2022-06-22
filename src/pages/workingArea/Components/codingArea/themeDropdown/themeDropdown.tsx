
import { IonSelect, IonSelectOption } from "@ionic/react";
import monacoThemes from "monaco-themes/themes/themelist.json";
import './style.css'
// import { customStyles } from "../constants/customStyles";

const ThemeDropdown = ({ handleThemeChange,theme }:any) => {

  return (
    <IonSelect
      className="theme-dropdown__container"
      placeholder={theme}
      interface="popover"
      onIonChange={handleThemeChange}
      // value={theme}
    >
      {Object.entries(monacoThemes).map(([themeId, themeName]) => <IonSelectOption key={themeId} value={themeId}>{themeName}</IonSelectOption>)}
   </IonSelect>
  );
};

export default ThemeDropdown;