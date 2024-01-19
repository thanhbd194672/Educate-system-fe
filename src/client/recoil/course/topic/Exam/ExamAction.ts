import {useInjection} from "inversify-react";
import {ApiService} from "@/client/repositories/ApiService";
import {useRecoilState, useRecoilValue} from "recoil";
import {ExamState} from "@/client/recoil/course/topic/Exam/ExamState";
import {T_TopicItemVO, ExamModel} from "@/client/model/TopicItemModel";
import {E_SendingStatus} from "@/client/const/Types";
import {setErrorHandled} from "@/client/recoil/CmAction";

export const ExamAction = () => {
    const apiService = useInjection(ApiService)
    const [state, setState] = useRecoilState(ExamState)
    const vm = useRecoilValue(ExamState)
    const dispatchGetExam = (query?: T_TopicItemVO,id?:string|null) => {
        const _query = {
            ...query,
        }
        setState({
            ...state,
            isLoading: E_SendingStatus.loading
        })
        apiService
            .getExam(_query,id)
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
                            data: new ExamModel(r.data)
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
        dispatchGetExam,
    }
}