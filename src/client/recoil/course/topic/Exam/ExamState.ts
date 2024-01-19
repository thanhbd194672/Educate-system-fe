import {E_SendingStatus} from "@/client/const/Types";
import {atom} from "recoil";
import {PaginateMetaModel} from "@/client/model/ApiResModel";
import {KeyGetExam} from "@/client/recoil/KeyRecoil";
import {ExamModel} from "@/client/model/TopicItemModel";

export type T_ExamState = {
    isLoading: E_SendingStatus,
    data?: ExamModel
    error?: Record<string, any>,
    query: {
        page: number,
        count: number,
        page_item: number,
        limit: number,
        sort: string,
        order: string
    }
    oMeta?: PaginateMetaModel
}
export const initialState: T_ExamState = {
    isLoading: E_SendingStatus.idle,
    query: {
        page: 1,
        limit: 10,
        count: 1,
        page_item: 10,
        sort: "date",
        order: "desc"
    }
}
export const ExamState = atom<T_ExamState>({
    key: KeyGetExam,
    default: initialState
})