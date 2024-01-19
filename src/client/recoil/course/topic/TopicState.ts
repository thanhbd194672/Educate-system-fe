import {E_SendingStatus} from "@/client/const/Types";
import {TopicModel} from "@/client/model/TopicModel";
import {atom} from "recoil";
import {PaginateMetaModel} from "@/client/model/ApiResModel";
import {KeyGetTopic} from "@/client/recoil/KeyRecoil";

export type T_TopicState = {
    isLoading: E_SendingStatus,
    items: TopicModel[],
    item?: TopicModel
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
export const initialState: T_TopicState = {
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
export const TopicState = atom<T_TopicState>({
    key: KeyGetTopic,
    default: initialState
})