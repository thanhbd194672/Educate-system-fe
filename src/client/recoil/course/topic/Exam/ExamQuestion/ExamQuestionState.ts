import {E_SendingStatus} from "@/client/const/Types";
import {atom} from "recoil";
import {PaginateMetaModel} from "@/client/model/ApiResModel";
import {KeyGetExamQuestion} from "@/client/recoil/KeyRecoil";
import {ExamQuestionModel} from "@/client/model/ExamQuestionModel";

export type T_ExamQuestionState = {
    isLoading: E_SendingStatus,
    items: ExamQuestionModel[],
    item?: ExamQuestionModel
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
export const initialState: T_ExamQuestionState = {
    isLoading: E_SendingStatus.idle,
    items: [],
    query: {
        page: 1,
        limit: 10,
        count: 1,
        page_item: 10,
        sort: "date",
        order: "desc"
    }
}
export const ExamQuestionState = atom<T_ExamQuestionState>({
    key: KeyGetExamQuestion,
    default: initialState
})