import {injectable} from "inversify";
import {ApiResModel} from "@/client/model/ApiResModel";
import {AxiosClient} from "@/client/repositories/AxiosClient";
import {T_UserLoginV0} from "@/client/model/UserModel";


export class ApiService{
    init(): Promise<ApiResModel> {
        return AxiosClient.get("init-web")
    }
    tracking(): Promise<ApiResModel> {
        return AxiosClient.get("tracking-web")
    }

    login(data: T_UserLoginV0): Promise<ApiResModel> {
        return AxiosClient.post("auth/login", data);
    }

    logout(): Promise<ApiResModel> {
        return AxiosClient.post("account/logout");
    }
}