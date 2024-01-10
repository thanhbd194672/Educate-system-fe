import {CourseModel} from "@/client/model/CourseModel";
import {E_SendingStatus} from "@/client/const/Types";


export type T_AddCourseState = {
    course? : CourseModel
    status?: E_SendingStatus
    error?: Record<string, any>
}

export const initialState: T_AddCourseState = {
    status: E_SendingStatus.idle
}
export const initialFormState: T_CommonState = {
    isLoading: E_SendingStatus.idle
}
export type T_CommonState = {
    isLoading: E_SendingStatus,
    error?: Record<string, any>
}