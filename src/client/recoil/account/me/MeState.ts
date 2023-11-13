import {E_SendingStatus} from "@/client/const/Types";
import {UserModel} from "@/client/model/UserModel";
import {atom} from "recoil";

export type T_MeState = {
    user?: UserModel
    isLoading: E_SendingStatus
    error?: Record<string, any>
}

export const initialState: T_MeState = {
    isLoading: E_SendingStatus.idle
}

