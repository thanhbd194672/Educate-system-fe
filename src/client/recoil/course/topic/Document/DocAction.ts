import {useInjection} from "inversify-react";
import {ApiService} from "@/client/repositories/ApiService";
import {useRecoilState, useRecoilValue} from "recoil";
import {DocState} from "@/client/recoil/course/topic/Document/DocState";
import {T_TopicItemVO, DocModel} from "@/client/model/TopicItemModel";
import {E_SendingStatus} from "@/client/const/Types";
import {setErrorHandled} from "@/client/recoil/CmAction";

export const DocAction = () => {
    const apiService = useInjection(ApiService)
    const [state, setState] = useRecoilState(DocState)
    const vm = useRecoilValue(DocState)
    const dispatchGetDoc = (query?: T_TopicItemVO,id?:string|null) => {
        const _query = {
            ...query,
        }
        setState({
            ...state,
            isLoading: E_SendingStatus.loading
        })
        apiService
            .getDoc(_query,id)
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

                    if (r.data) {
                        merge = {
                            ...merge,
                            data: new DocModel(r.data)
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
        dispatchGetDoc,
    }
}