import Yeti from '../../assets/images/avatars/yeti.png';
import Aphrodite from '../../assets/images/avatars/aphrodite.png';
import Bigfoot from '../../assets/images/avatars/bigfoot.png';
import Cyclops from '../../assets/images/avatars/cyclops.png';
import Devil from '../../assets/images/avatars/devil.png';
import Fairy from '../../assets/images/avatars/fairy.png';
import Madremonte from '../../assets/images/avatars/madremonte.png';
import Minotaur from '../../assets/images/avatars/minotaur.png'



export type LessonInfo = {
    id: string,
    order: number, 
    tests: string,
    title: string
}


export type UserAndCourseInfo = {
    course: {
                lessons: [
                            {
                                id:string,
                                order:number,
                                tests:string,
                                title:string
                            }
                        ],
                        students:object[]
            }, 
                                                             
    student: {
                bootcamp:string, 
                course: {
                            idCourse:string,
                            order:number,
                            progress:string
                        },
                email:string,
                lastname:string,
                name:string,
                role:string
            }
}

export const Avatars:any = {
    Yeti: Yeti,
    Aphrodite: Aphrodite,
    Bigfoot: Bigfoot,
    Cyclops: Cyclops,
    Devil: Devil,
    Fairy: Fairy,
    Madremonte: Madremonte,
    Minotaur: Minotaur
}