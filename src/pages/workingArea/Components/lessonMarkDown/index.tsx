import ReactMarkDown from "react-markdown";
import gfm from "remark-gfm";
import { useIonViewWillEnter } from "@ionic/react";
import { useState } from "react";
import './style.css'

const LessonMarkDown = ({markDownId}:any) => {
    const [markdown, setMarkdown] = useState('');

    useIonViewWillEnter(() => {
        //Fetch to get the markdown file by id
        fetch(`http://localhost:4000/assets/courses/javascript/${markDownId.id}.md`)
        .then(r => r.text())
        .then(r => setMarkdown(r));
    }, [markDownId])
    
    return (
        <ReactMarkDown className="markdown__container" children={markdown} remarkPlugins={[gfm]}></ReactMarkDown>
    );
}

export default  LessonMarkDown;



