import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {UserModel} from "@/client/model/UserModel";
import {WebConfig} from "@/client/config/WebConfig";
import {useInjection} from "inversify-react";

type _T_CourseState = {
    name_course?: string
    name_topic?: string
    time_to_do?: string
}

export const initialCourse: _T_CourseState = {}

export const CourseContent = createContext<[_T_CourseState, (Course: _T_CourseState) => void]>([initialCourse, () => {
}])

export const useCourseContext = () => useContext(CourseContent)


export const CourseContextProvider = (props: {
    children: ReactNode
}) => {
    const [CourseState, setCourseState] = useState<_T_CourseState>(initialCourse)

    const defaultCourseContext: [_T_CourseState, typeof setCourseState] = [CourseState, setCourseState]
    useEffect(() => {
        const localStorageCourseName = localStorage.getItem('name_course')
        const localStorageTopicName = localStorage.getItem('name_topic')
        const localStorageTimeToDo = localStorage.getItem('time_to_do')

        setCourseState({
            ...CourseState,
            name_course: localStorageCourseName ?? 'null',
            name_topic: localStorageTopicName ?? 'null',
            time_to_do: localStorageTimeToDo ?? 'null,'
        })


    }, [])

    return (
        <CourseContent.Provider value={defaultCourseContext}>
            {props.children}
        </CourseContent.Provider>
    )
}