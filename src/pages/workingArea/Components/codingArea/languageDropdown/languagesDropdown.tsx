

import { IonSelect, IonSelectOption } from '@ionic/react';
// import Select from 'react-select';
// import { customStyles } from "../constants/customStyles";
import { languageOptions } from "../constants/languageOptions";

const LanguagesDropdown = ({ onSelectChange }:any) => {
  return (
    <IonSelect
      placeholder={languageOptions[0].name}
      interface='popover'
      // value={languageOptions[0].name}
      onIonChange={(selectedOption:any) => onSelectChange(selectedOption)}
    >
      {languageOptions.map(language => <IonSelectOption key={language.id} value={language.name}>{language.name}</IonSelectOption>)}
    </IonSelect>
  );
};

export default LanguagesDropdown;