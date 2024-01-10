import {useState} from "react";
import {initialState, T_LoginState} from "@/client/recoil/auth/LoginState";
import {T_UserLoginV0, UserModel} from "@/client/model/UserModel";
import {E_SendingStatus} from "@/client/const/Types";
import {AxiosClient} from "@/client/repositories/AxiosClient";
import {WebConfig} from "@/client/config/WebConfig";
import {App} from "@/client/const/App";
import {useSessionContext} from "@/client/presentation/contexts/SessionContext";
import {useInjection} from "inversify-react";

export const LoginAction = () => {
    const [state, setState] = useState<T_LoginState>(initialState)
    const [session, setSession] = useSessionContext()
    const webConfig = useInjection(WebConfig);
    const dispatchLogin = (data: T_UserLoginV0) => {
        setState({
            ...state,
            isLoading: E_SendingStatus.loading
        })

        AxiosClient
            .post(`${App.ApiUrl}/auth/login`, data)
            .then(r => {
                if (r.data) {
                    const user = new UserModel(r.data)
                    setState({
                        ...state,
                        isLoading: E_SendingStatus.success,
                        item: user
                    })
                    setSession({
                        ...session,
                        isAuthenticated: true,
                        user: user,
                        redirectPath: '/'
                    })
                    webConfig.token = user.accessToken?.token
                    localStorage.setItem('user', JSON.stringify(r.data))
                } else {
                    setState({
                        ...state,
                        isLoading: E_SendingStatus.error,
                        error: r.error
                    })
                }
            })
            .catch(e => {
                console.log(e)
                setState({
                    ...state,
                    isLoading: E_SendingStatus.error,
                })
            })
    }
    const dispatchResetState = () => {
        setState({
            ...initialState
        })
    }

    return {
        vm: state,
        dispatchLogin,
        dispatchResetState
    }
}