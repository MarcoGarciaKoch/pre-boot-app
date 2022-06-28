import ReactMarkDown from "react-markdown";
import gfm from "remark-gfm";
import { useIonViewWillEnter } from "@ionic/react";
import { useState } from "react";
import './style.css';
import 'github-markdown-css';

const LessonMarkDown = ({markDownId, dark}:any) => {
    const [markdown, setMarkdown] = useState('');

    useIonViewWillEnter(() => {
        //Fetch to get the markdown file by id
        fetch(`${process.env.REACT_APP_API_BASE_URL}/assets/courses/javascript/${markDownId.id}.md`)
        .then(r => r.text())
        .then(r => setMarkdown(r));
    }, [markDownId])
    
    return (
        <div className='scrollable-markdown__container markdown-body'>
        <ReactMarkDown className={`style.reactMarkDown ${dark ? "dark-markdown__container" : "light-markdown__container"}`} children={markdown} remarkPlugins={[gfm]}></ReactMarkDown>
        </div>
    );
}

export default  LessonMarkDown;



