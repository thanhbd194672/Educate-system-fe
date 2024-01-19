import {Model} from "./Model";
import {Normalize} from "../core/Normalize";

export type T_Topic = {
    id: string;
    name: string;
    description: string;
    is_free: number;
    id_course: string;
    created_at: string;
    updated_at: string;
}
export type T_QueryVO = {
    page?: number
    limit?: number
    sort?: string
    order?: string
    search?: string
    tab?: string
}

export class TopicModel extends Model{
    id?: string;
    name?: string;
    description?: string;
    is_free?: number;
    id_course?: string;
    created_at?: string;
    updated_at?: string;
    status?: number;

    constructor(data: Record<string, any>) {
        super(data)
        this.id = Normalize.initJsonString(data, 'id')
        this.name = Normalize.initJsonString(data, 'name')
        this.description = Normalize.initJsonString(data, 'description')
        this.is_free = Normalize.initJsonNumber(data,'is_free')
        this.id_course =Normalize.initJsonString(data, 'id_course')
        this.created_at = Normalize.initJsonString(data,'created_at');
        this.updated_at = Normalize.initJsonString(data,'updated_at');
        this.status  = Normalize.initJsonNumber(data,'status');
    }
    copyFrom = (data: Record<string, any>): TopicModel => {
        if (this.raw) {
            return new TopicModel({...this.raw, ...data})
        } else {
            return new TopicModel(data)
        }
    }
}

