import 'reflect-metadata';
import {injectable} from "inversify";
import {ApiResModel} from "@/client/model/ApiResModel";
import {AxiosClient} from "@/client/repositories/AxiosClient";
import {T_UserLoginV0} from "@/client/model/UserModel";
import {T_QueryVO} from "@/client/model/CourseModel";
import {App} from "@/client/const/App";
import {T_TopicItemVO} from "@/client/model/TopicItemModel";
import {T_ExamQuestionVO} from "@/client/model/ExamQuestionModel";
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
        return AxiosClient.get(`${App.ApiUrl}`,query,'course/gets')
    }

    getTeacher(query?: T_QueryVO) :Promise<ApiResModel>{
        return AxiosClient.get(`${App.ApiUrl}`,query,'account/teacher')
    }
    getTopic(query?: T_QueryVO ,id?: string|null ) :Promise<ApiResModel>{
        return AxiosClient.get(`${App.ApiUrl}`,query,`course/topic/gets/${id}`)
    }

    getItemTopic(query?: T_TopicItemVO ,id?: string|null ) :Promise<ApiResModel>{
        return AxiosClient.get(`${App.ApiUrl}`,query,`course/topic/gets/detail/${id}`)
    }
    getVideo(query?: T_TopicItemVO ,id?: string|null ) :Promise<ApiResModel>{
        return AxiosClient.get(`${App.ApiUrl}`,query,`course/topic/video/get/${id}`)
    }
    getExam(query?: T_TopicItemVO ,id?: string|null ) :Promise<ApiResModel>{
        return AxiosClient.get(`${App.ApiUrl}`,query,`course/topic/exam/get/${id}`)
    }
    getDoc(query?: T_TopicItemVO ,id?: string|null ) :Promise<ApiResModel>{
        return AxiosClient.get(`${App.ApiUrl}`,query,`course/topic/doc/get/${id}`)
    }
    getExamQuestion(query?: T_ExamQuestionVO ,id?: string|null ) :Promise<ApiResModel>{
        return AxiosClient.get(`${App.ApiUrl}`,query,`course/topic/exam/question/gets/${id}`)
    }
    addCourse(data?: FormData) :Promise<ApiResModel>{
        return AxiosClient.post(`${App.ApiUrl}/course/add`,data)
    }
}