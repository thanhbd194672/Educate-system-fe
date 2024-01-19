import {setErrorHandled} from "@/client/recoil/CmAction";
import {useInjection} from "inversify-react";
import {useRecoilState, useRecoilValue} from "recoil";
import {TeacherState} from "./TeacherState";
import {ApiService} from "@/client/repositories/ApiService";
import {UserModel,T_UserVO} from "@/client/model/UserModel";
import {E_SendingStatus} from "@/client/const/Types";

export const TeacherAction = () => {

    const apiService = useInjection(ApiService)
    const [state, setState] = useRecoilState(TeacherState)
    const vm = useRecoilValue(TeacherState)

    const dispatchGetTeacher = (query?: T_UserVO) => {
        console.log(query)
        setState({
            ...state,
            isLoading: E_SendingStatus.loading
        })
        const _query = {
            ...query,
        }
        apiService
            .getTeacher(_query)
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
                            items: r.items.map((item: Record<string, any>) => new UserModel(item))
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
        dispatchGetTeacher,
    }
}