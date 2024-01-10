import {setErrorHandled} from "@/client/recoil/CmAction";
import {useInjection} from "inversify-react";
import {useRecoilState, useRecoilValue} from "recoil";
import {CourseState} from "./CourseState";
import {E_SendingStatus} from "@/client/const/Types";
import {ApiService} from "@/client/repositories/ApiService";
import {CourseModel, T_QueryVO} from "@/client/model/CourseModel";
import {PaginateMetaModel} from "@/client/model/ApiResModel";

export const CourseAction = () => {

    const apiService = useInjection(ApiService)
    const [state, setState] = useRecoilState(CourseState)
    const vm = useRecoilValue(CourseState)

    const dispatchGetCourse = (query?: T_QueryVO) => {
        console.log(query)
        setState({
            ...state,
            isLoading: E_SendingStatus.loading
        })
        const _query = {
            ...query,
        }
        apiService
            .getCourse(_query)
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
                            items: r.items.map((item: Record<string, any>) => new CourseModel(item))
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
        dispatchGetCourse,
    }
}