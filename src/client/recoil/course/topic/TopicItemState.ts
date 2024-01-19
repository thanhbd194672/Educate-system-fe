import {E_SendingStatus} from "@/client/const/Types";
import {atom} from "recoil";
import {PaginateMetaModel} from "@/client/model/ApiResModel";
import {KeyGetItemTopic} from "@/client/recoil/KeyRecoil";
import {TopicItemModel} from "@/client/model/TopicItemModel";

export type T_TopicItemState = {
    isLoading: E_SendingStatus,
    items: TopicItemModel[],
    item?: TopicItemModel
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
export const initialState: T_TopicItemState = {
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
export const TopicItemState = atom<T_TopicItemState>({
    key: KeyGetItemTopic,
    default: initialState
})