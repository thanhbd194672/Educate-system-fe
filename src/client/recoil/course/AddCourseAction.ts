import {useInjection} from "inversify-react";
import {ApiService} from "@/client/repositories/ApiService";
import {useState} from "react";
import {initialFormState, initialState, T_AddCourseState, T_CommonState} from "@/client/recoil/course/AddCourseState";
import {CourseModel, T_Course} from "@/client/model/CourseModel";
import {E_SendingStatus} from "@/client/const/Types";
import {setErrorHandled} from "@/client/recoil/CmAction";


export const AddCourseAction = () => {
    const apiService = useInjection(ApiService);
    const [formState, setFormState] = useState<T_CommonState>(initialFormState)
    const [state, setState] = useState<T_AddCourseState>(initialState)

    const dispatchAddCourse = (data: T_Course) => {
        const formData = new FormData();
        formData.append('name_course', data.name_course)
        formData.append('image', data.image)
        formData.append('time_to_learn', data.time_to_learn)
        formData.append('price', data.price.toString())
        formData.append('description', data.description)
        formData.append('subject', data.subject)

        setState({
            ...state,
            status: E_SendingStatus.loading
        })

        apiService
            .addCourse(formData)
            .then(r => {
                console.log(r)
                if (r.success) {
                    const course = new CourseModel(r.data)
                    console.log(course);
                    setState({
                        ...state,
                        course: course,
                        status: E_SendingStatus.success
                    })
                    setFormState({
                        ...state,
                        isLoading: E_SendingStatus.success
                    })
                } else {
                    setState({
                        ...state,
                        status: E_SendingStatus.error,
                        error: r.error
                    })
                    setFormState({
                        ...state,
                        isLoading: E_SendingStatus.error,
                        error: r.error
                    })
                }
            })
            .catch(err => setErrorHandled(state, setState, 'status', err))
    }
    const dispatchResetState = () => {
        setState(initialState)
    }

    return {
        vm: state,
        vmForm: formState,
        dispatchAddCourse,
        dispatchResetState
    }
}