import { IonItem, IonAvatar, IonLabel } from '@ionic/react';
import './style.css';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';



const Lesson = ({lesson, userCourseData}:any) => {
    const history = useHistory();
    const [isLessonDone, setIsLessonDone] = useState(false);
 

    useEffect(() => {
        if(lesson.order < userCourseData.student.course.order){
            setIsLessonDone(true);
        }
    },[userCourseData])

    const navigateToLesson = () => {
        if(lesson.order <= userCourseData.student.course.order) {
            history.push(`/student/working-area/${lesson.id}`);
            // history.push({
            //     pathname: '/working-area',
            //     search: `?lesson=${lesson.id}`,  // query string
            //     state: {  // location state
            //     update: true, 
            //     }
            // })
        }
    }

    return(
        <IonItem lines="full" onClick={navigateToLesson} className={lesson.order > userCourseData.student.course.order ? 'lesson__container-opaque' : 'lesson__container'}>
            <IonAvatar slot="start" className={isLessonDone ? 'lesson-avatar-done'  : 'lesson-avatar'}>
                {isLessonDone ? '✓' : lesson.order}
            </IonAvatar>
            <IonLabel>
                <h6>JavaScript</h6>
                <h2>{lesson.title}</h2>
            </IonLabel>
        </IonItem>
    )

}


export default Lesson;