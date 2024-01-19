import {Model} from "./Model";
import {Normalize} from "../core/Normalize";

export type T_TopicItem = {
    id: string;
    name: string;
    id_topic: string;
    type: string;
    created_at: string;
    updated_at: string;
    status: string;
}

export type T_Video = T_TopicItem & {
    video: File;
}
export type T_Exam = T_TopicItem & {
    is_final: number;
    time_to_do : string;
}
export type T_Doc = T_TopicItem & {
    link_doc: string;
    content : string;
}


export type T_TopicItemVO = {
    page?: number
    limit?: number
    sort?: string
    order?: string
    search?: string
    tab?: string
}

export class TopicItemModel extends Model {
    id?: string;
    name?: string;
    id_topic?: string;
    type?: string;
    created_at      ?: string;
    updated_at      ?: string;
    status          ?: number;

    constructor(data: Record<string, any>) {
        super(data)
        this.id = Normalize.initJsonString(data, 'id')
        this.name = Normalize.initJsonString(data, 'name')
        this.id_topic = Normalize.initJsonString(data, 'id_topic')
        this.type = Normalize.initJsonString(data, 'type')
        this.created_at = Normalize.initJsonString(data,'created_at');
        this.updated_at = Normalize.initJsonString(data,'updated_at');
        this.status  = Normalize.initJsonNumber(data,'status');
    }

    copyFrom = (data: Record<string, any>): TopicItemModel => {
        if (this.raw) {
            return new TopicItemModel({...this.raw, ...data})
        } else {
            return new TopicItemModel(data)
        }
    }
}
export class VideoModel extends TopicItemModel{
    video? : string;
    constructor(data: Record<string, any>) {
        super(data)
        this.video = Normalize.initJsonString(data,'video');

    }
    copyFrom = (data: Record<string, any>): VideoModel => {
        if (this.raw) {
            return new VideoModel({...this.raw, ...data})
        } else {
            return new VideoModel(data)
        }
    }

}
export class ExamModel extends TopicItemModel{
    time_to_do ?: string;
    is_final?: number;
    constructor(data: Record<string, any>) {
        super(data)
        this.time_to_do = Normalize.initJsonString(data,'time_to_do');
        this.is_final = Normalize.initJsonNumber(data,'is_final');
    }
    copyFrom = (data: Record<string, any>): ExamModel => {
        if (this.raw) {
            return new ExamModel({...this.raw, ...data})
        } else {
            return new ExamModel(data)
        }
    }
}
export class DocModel extends TopicItemModel{
    link_doc ?: string;
    content?: string;
    constructor(data: Record<string, any>) {
        super(data)
        this.link_doc = Normalize.initJsonString(data,'link_doc');
        this.content = Normalize.initJsonString(data,'content');
    }
    copyFrom = (data: Record<string, any>): ExamModel => {
        if (this.raw) {
            return new ExamModel({...this.raw, ...data})
        } else {
            return new ExamModel(data)
        }
    }
}