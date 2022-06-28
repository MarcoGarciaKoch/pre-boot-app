import { useEffect, useState } from "react";
import CodeEditorWindow from './codingEditor/codeEditorWindow';
import { languageOptions } from './constants/languageOptions';
import { defineTheme } from './themeDropdown/defineTheme';
import { useKeyPress } from '../../../../core/users/user.hook';
import OutputWindow from './outputWindow/outputWindow';
import CustomInput from './customInput/customInput';
import OutputDetails from './outputDetails/outputDetails';
import ThemeDropdown from './themeDropdown/themeDropdown';
import LanguagesDropdown from './languageDropdown/languagesDropdown';
import { IonButton, IonContent, IonItem, IonLabel, useIonToast } from "@ionic/react";
import { config } from '../../../../config';
import './style.css';
import { useNextLesson } from '../../../../core/users/user.hook';
import { useHistory } from "react-router";
import { useTranslation } from 'react-i18next';


const javascriptDefault = `// Completa los ejercicios`;
const themeDefault = "oceanic-next";





const Landing = ({markDownId, email}:any) => {
  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [theme, setTheme] = useState(themeDefault);
  const [language, setLanguage] = useState(languageOptions[0]);
  const [present, dismiss] = useIonToast();
  const { getNextLesson, nextLessonData}  = useNextLesson();
  const history = useHistory();
  const [t, i18n] = useTranslation('translation');

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl:any) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);


  const onChange = (action:any, data:any) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };


  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
   
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": config.RAPID_API_HOST,
        "X-RapidAPI-Key": config.RAPID_API_KEY,
      },
      body: JSON.stringify(formData),
    };

     try {
      fetch(`${config.RAPID_API_URL}?base64_encoded=true&fields=*`, options)
      // fetch('https://b86c1a44-8b0f-4e23-8044-76d75955c98a.mock.pstmn.io/submissions?base64_encoded=true&fields=*')
      .then(r => r.json())
      .then(d => {
        const token = d.token;
        checkStatus(token);
      })
    } catch(err:any){
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      };
  };




  const checkStatus = async (token:string) => {
      const options = {
        method: "GET",
      
        headers: {
          "X-RapidAPI-Host": config.RAPID_API_HOST,
          "X-RapidAPI-Key": config.RAPID_API_KEY,
        },
      };
      try {
        await fetch(`${config.RAPID_API_URL}/${token}?base64_encoded=true&fields=*`, options)
        // await fetch('https://b86c1a44-8b0f-4e23-8044-76d75955c98a.mock.pstmn.io/submissions/04b04da4-248e-4cf5-84e0-a80818e035fb?base64_encoded=true&fields=*')
        .then(r => r.json())
        .then(d => {
        const statusId = d.status?.id;
        // Processed - we have a result
        if (statusId === 1 || statusId === 2) {
          // still processing
          setTimeout(() => {
            checkStatus(token)
          }, 2000)
          return
        
        }else {
          setProcessing(false)
          setOutputDetails(d) 
          showSuccessToast(`Compiled Successfully!`)
          console.log('response.data', d) 
          return
        }
        })
      }catch (err) {
        console.log("err", err);
        setProcessing(false);
        showErrorToast(err);
      }
  };


  function handleThemeChange(th:any) {
    defineTheme(th.detail.value).then(() => setTheme(th.detail.value));
  }

  
  useEffect(() => {
    defineTheme(themeDefault);
  },[]);

  const showSuccessToast = (msg:any) => {
    present({
      message: msg || `Compiled Successfully!`,
      position: "top",
      duration: 3000,
      animated: true
    });
    dismiss();
  };
  const showErrorToast = (msg:any) => {
    present({
      message: msg || `Something went wrong! Please try again.`,
      position: "top",
      duration: 3000,
      animated: true
    });
    dismiss();
  };


  const nextLesson = async (e:any) => {
    e.preventDefault();
      const markDownIdAndEmail = {
           email: email,
           markDownId: markDownId
      };
     const data = await getNextLesson(markDownIdAndEmail);
     console.log(data)
     history.push(`/student/working-area/${data.nextLesson.id}`)
  }
  


  return (
    <IonContent>
        <IonItem color="light" lines="none" className="language-dropdown__container ion-justify-content-between">
          <IonLabel>{t('specific.workingArea.language')}</IonLabel>
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </IonItem>
        <IonItem color="light" lines="none"  className="theme-dropdown__container ion-justify-content-between">
          <IonLabel>{t('specific.workingArea.theme')}</IonLabel>
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </IonItem>
        <div>
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme}
          />
        </div>
        <OutputWindow outputDetails={outputDetails}></OutputWindow>
        <CustomInput
          customInput={customInput}
          setCustomInput={setCustomInput}
        >
        </CustomInput>
        <div className="code-window-buttons__container">
          <IonButton
            color='secondary'
            className="ion-padding  code-editor-button"
            onClick={handleCompile}
            disabled={!code}
          >
            {processing ? "Processing..." : `${t('specific.workingArea.checkButton')}`}
          </IonButton>
          <IonButton color="warning" className="ion-padding  code-editor-button">{t('specific.workingArea.showButton')}</IonButton>
          <IonButton color="success" className="ion-padding  code-editor-button" onClick={nextLesson}>{t('specific.workingArea.nextButton')}</IonButton>
        </div>
        {outputDetails && <OutputDetails outputDetails={outputDetails} />}
    </IonContent>
  );
};
export default Landing;