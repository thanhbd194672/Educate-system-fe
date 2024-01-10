import 'reflect-metadata';
import {injectable} from "inversify";
import {ApiResModel} from "@/client/model/ApiResModel";
import {AxiosClient} from "@/client/repositories/AxiosClient";
import {T_UserLoginV0} from "@/client/model/UserModel";
import {T_QueryVO} from "@/client/model/CourseModel";
import {App} from "@/client/const/App";
@injectable()

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
    getCourse(query?: T_QueryVO) :Promise<ApiResModel>{
        return AxiosClient.get(`${App.ApiUrl}/course/gets`,query)
    }
    addCourse(data?: FormData) :Promise<ApiResModel>{
        return AxiosClient.post(`${App.ApiUrl}/course/add`,data)
    }
}