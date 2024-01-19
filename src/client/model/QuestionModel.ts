import {Model} from "./Model";
import {Normalize} from "../core/Normalize";

export type T_Question = {
    id: string;
    teacher_id: string;
    content: string;
    type: string;
    answer: object;
    correct_answer: object;
    image: File[];
    created_at: string;
    updated_at: string;
    status: number
}
export type T_QuestionVO = {
    page?: number
    limit?: number
    sort?: string
    order?: string
    search?: string
    tab?: string
}

export class QuestionModel extends Model{
    id?: string;
    teacher_id?: string;
    content?: string;
    type?: string;
    answer?: object;
    correct_answer?: object;
    image?: string[];
    created_at?: string;
    updated_at?: string;
    status?: number


    constructor(data: Record<string, any>) {
        super(data)
        this.id = Normalize.initJsonString(data,'id_question')
        this.teacher_id =Normalize.initJsonString(data, 'id_exam')
        this.content =Normalize.initJsonString(data, 'content')
        this.type =Normalize.initJsonString(data, 'type')
        this.answer =Normalize.initJsonObject(data, 'answer')
        this.correct_answer =Normalize.initJsonObject(data, 'correct_answer')
        this.image =Normalize.initJsonObject(data, 'image')
        this.status =Normalize.initJsonNumber(data, 'id_exam')
        this.created_at = Normalize.initJsonString(data,'created_at');
        this.updated_at = Normalize.initJsonString(data,'updated_at');
    }
    copyFrom = (data: Record<string, any>): QuestionModel => {
        if (this.raw) {
            return new QuestionModel({...this.raw, ...data})
        } else {
            return new QuestionModel(data)
        }
    }
}

