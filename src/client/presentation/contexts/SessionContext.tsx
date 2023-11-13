import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {UserModel} from "@/client/model/UserModel";
import {WebConfig} from "@/client/config/WebConfig";

type _T_SessionState = {
    isAuthenticated?: boolean,
    redirectPath: string,
    user?: UserModel,
}

export const initialSession: _T_SessionState = {
    redirectPath: '/'
}

export const SessionContent = createContext<[_T_SessionState, (session: _T_SessionState) => void]>([initialSession, () => {
}])

export const useSessionContext = () => useContext(SessionContent)


export const SessionContextProvider = (props: {
    children: ReactNode
}) => {
    const [sessionState, setSessionState] = useState<_T_SessionState>(initialSession)

    const defaultSessionContext: [_T_SessionState, typeof setSessionState] = [sessionState, setSessionState]

    useEffect(() => {
        const localStorageUser = localStorage.getItem('user')

        if (localStorageUser) {
            const user = new UserModel(JSON.parse(localStorageUser));
            console.log(user)
            setSessionState({
                ...sessionState,
                isAuthenticated: true,
                user: user,
                redirectPath: '/',
            })
            WebConfig.getInstance().token = user.accessToken?.token
        } else {
            setSessionState({
                ...sessionState,
                isAuthenticated: false
            })
        }
    }, [])

    return (
        <SessionContent.Provider value={defaultSessionContext}>
            {props.children}
        </SessionContent.Provider>
    )
}