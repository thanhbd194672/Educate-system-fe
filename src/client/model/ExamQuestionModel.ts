import {Model} from "./Model";
import {Normalize} from "../core/Normalize";
import {QuestionModel} from "@/client/model/QuestionModel";

export type T_ExamQuestion = {
    id_exam: string;
    id_question: string;
    mark: number;
    created_at: string;
    updated_at: string;
    detail: QuestionModel
}
export type T_ExamQuestionVO = {
    page?: number
    limit?: number
    sort?: string
    order?: string
    search?: string
    tab?: string

}

export class ExamQuestionModel extends Model{
    id_exam?: string;
    id_question?: string;
    mark?: number;
    created_at?: string;
    updated_at?: string;
    detail?: QuestionModel;

    constructor(data: Record<string, any>) {
        super(data)
        this.id_question = Normalize.initJsonString(data,'id_question')
        this.id_exam =Normalize.initJsonString(data, 'id_exam')
        this.created_at = Normalize.initJsonString(data,'created_at');
        this.updated_at = Normalize.initJsonString(data,'updated_at');
        this.mark  = Normalize.initJsonNumber(data,'mark');
        this.detail =Normalize.initJsonObject(data, 'detail', v => new QuestionModel(v))
    }
    copyFrom = (data: Record<string, any>): ExamQuestionModel => {
        if (this.raw) {
            return new ExamQuestionModel({...this.raw, ...data})
        } else {
            return new ExamQuestionModel(data)
        }
    }
}

