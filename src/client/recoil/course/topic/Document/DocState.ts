import {E_SendingStatus} from "@/client/const/Types";
import {atom} from "recoil";
import {PaginateMetaModel} from "@/client/model/ApiResModel";
import {KeyGetDoc} from "@/client/recoil/KeyRecoil";
import {DocModel} from "@/client/model/TopicItemModel";

export type T_DocState = {
    isLoading: E_SendingStatus,
    data?: DocModel
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
export const initialState: T_DocState = {
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
export const DocState = atom<T_DocState>({
    key: KeyGetDoc,
    default: initialState
})