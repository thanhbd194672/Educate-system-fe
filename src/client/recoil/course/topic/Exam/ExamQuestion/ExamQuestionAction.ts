import {useInjection} from "inversify-react";
import {ApiService} from "@/client/repositories/ApiService";
import {useRecoilState, useRecoilValue} from "recoil";
import {ExamQuestionState} from "@/client/recoil/course/topic/Exam/ExamQuestion/ExamQuestionState";
import {T_ExamQuestionVO, ExamQuestionModel} from "@/client/model/ExamQuestionModel";
import {E_SendingStatus} from "@/client/const/Types";
import {setErrorHandled} from "@/client/recoil/CmAction";

export const ExamQuestionAction = () => {
    const apiService = useInjection(ApiService)
    const [state, setState] = useRecoilState(ExamQuestionState)
    const vm = useRecoilValue(ExamQuestionState)
    const dispatchGetExamQuestion = (query?: T_ExamQuestionVO,id?:string|null) => {
        const _query = {
            ...query,
        }
        setState({
            ...state,
            isLoading: E_SendingStatus.loading
        })
        apiService
            .getExamQuestion(_query,id)
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
                            items: r.items.map((item: Record<string, any>) => new ExamQuestionModel(item))
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
        dispatchGetExamQuestion,
    }
}