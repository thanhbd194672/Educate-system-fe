import {E_SendingStatus} from "@/client/const/Types";
import {UserModel} from "@/client/model/UserModel";
// import {KeyTeacher} from "../../KeyRecoil";
import {atom} from "recoil";
import {PaginateMetaModel} from "@/client/model/ApiResModel";
import {KeyGetTeacher} from "@/client/recoil/KeyRecoil";

export type T_TeacherState = {
    isLoading: E_SendingStatus,
    items: UserModel[],
    item?: UserModel
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
export const initialState: T_TeacherState = {
    isLoading: E_SendingStatus.idle,
    items: [],
    query:{
        page:1,
        limit:10,
        count:1,
        page_item:10,
        sort: "date",
        order: "desc"
    }
}
export const TeacherState  = atom<T_TeacherState>({
    key: KeyGetTeacher,
    default:initialState
})