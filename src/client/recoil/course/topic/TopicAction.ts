import {useInjection} from "inversify-react";
import {ApiService} from "@/client/repositories/ApiService";
import {useRecoilState, useRecoilValue} from "recoil";
import {TopicState} from "@/client/recoil/course/topic/TopicState";
import {TopicModel, T_QueryVO} from "@/client/model/TopicModel";
import {E_SendingStatus} from "@/client/const/Types";
import {setErrorHandled} from "@/client/recoil/CmAction";

export const TopicAction = () => {
    const apiService = useInjection(ApiService)
    const [state, setState] = useRecoilState(TopicState)
    const vm = useRecoilValue(TopicState)

    const dispatchGetTopic = (query?: T_QueryVO,id?:string|null) => {
        console.log(query)
        setState({
            ...state,
            isLoading: E_SendingStatus.loading
        })
        const _query = {
            ...query,
        }
        apiService
            .getTopic(_query,id)
            .then(r => {
                if (r.success) {
                    let merge = {...state}
                    const page = query?.page ?? 1
                    if (r.meta) {
                        merge = {
                            ...merge,
                            oMeta: r.meta
                        }

                        const limit = r.meta.perPage
                        // console.log(limit)

                        if (limit && limit !== merge.query.limit) {
                            merge.query = {
                                ...merge.query,
                                limit: limit
                            };
                        }

                    }

                    if (r.items) {
                        merge = {
                            ...merge,
                            items: r.items.map((item: Record<string, any>) => new TopicModel(item))
                        }
                    }

                    if (page !== merge.query.page) {
                        merge.query = {
                            ...merge.query,
                            page: page
                        }
                    }

                    setState({
                        ...merge,
                        isLoading: E_SendingStatus.success
                    })

                } else {
                    setState({
                        ...state,
                        isLoading: E_SendingStatus.error,
                        error: r.error
                    })
                }
            })
            .catch(err => setErrorHandled(state, setState, 'isLoading', err))
    }


    return {
        vm,
        dispatchGetTopic,
    }
}