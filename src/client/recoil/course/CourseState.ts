import {E_SendingStatus} from "@/client/const/Types";
import {CourseModel} from "@/client/model/CourseModel";
// import {KeyCourse} from "../../KeyRecoil";
import {atom} from "recoil";
import {PaginateMetaModel} from "@/client/model/ApiResModel";
import {KeyAddCourse} from "@/client/recoil/KeyRecoil";

export type T_CourseState = {
    isLoading: E_SendingStatus,
    items: CourseModel[],
    item?:CourseModel
    error?: Record<string, any>,
    query : {
        page: number,
        count : number,
        page_item:number,
        limit: number,
        sort: string,
        order: string
    }
    oMeta?: PaginateMetaModel
}
export const initialState: T_CourseState = {
    isLoading: E_SendingStatus.idle,
    items: [],
    query:{
        page:1,
        limit:3,
        count:1,
        page_item:10,
        sort: "date",
        order: "desc"
    }
}
export const CourseState  = atom<T_CourseState>({
    key: KeyAddCourse,
    default:initialState
})