
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

