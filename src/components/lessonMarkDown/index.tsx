import ReactMarkDown from "react-markdown";
import gfm from "remark-gfm";
import { useIonViewWillEnter } from "@ionic/react";
import { useQuery } from '../../core/auth/auth.hook';
import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";


const LessonMarkDown: React.FC = () => {
    const [markdown, setMarkdown] = useState('');
    const query = useQuery();
    const history = useHistory();
    const location = useLocation();

    useIonViewWillEnter(() => {
        fetch('http://localhost:4000/assets/courses/javascript/89341f08-2fc6-4b27-a59c-577b17eedb9b.md')
        .then(r => r.text())
        .then(r => setMarkdown(r));
    }, [])
    
    return (
        <ReactMarkDown children={markdown} remarkPlugins={[gfm]}></ReactMarkDown>
    );
}

export default  LessonMarkDown;



