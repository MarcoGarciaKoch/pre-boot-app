
import { useState } from "react";
import { IonItem } from "@ionic/react";
import Editor from "@monaco-editor/react";
import './style.css';

const CodeEditorWindow: React.FC<any> = ({ onChange, language, code, theme }:any) => {
  const [value, setValue] = useState(code ?? "");

  const handleEditorChange = (value:any) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <IonItem lines="none">
      <Editor
        height="40vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={theme}
        onChange={handleEditorChange}
        className='editor__container'
      />
    </IonItem>
  );
};
export default CodeEditorWindow;