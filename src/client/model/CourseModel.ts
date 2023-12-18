import {Model} from "./Model";
import {Normalize} from "../core/Normalize";


export class CourseModel extends Model {
    id              ?: string
    teacher_id      ?: string;
    status          ?: number;
    image           ?: Record<string, any>;
    time_to_learn   ?: string;
    price           ?: number;
    created_at      ?: string;
    updated_at      ?: string;
    name_course     ?: string;
    description     ?: string;
    subject        ?: string;

    constructor(data: Record<string, any>) {
        super(data)
        this.id = Normalize.initJsonString(data, 'id')
        this.teacher_id  = Normalize.initJsonString(data,'teacher_id');
        this.status  = Normalize.initJsonNumber(data,'status');
        this.image  = Normalize.initJsonObject(data,'image');
        this.time_to_learn = Normalize.initJsonString(data,'time_to_learn');
        this.price = Normalize.initJsonNumber(data, 'price');
        this.created_at = Normalize.initJsonString(data,'created_at');
        this.updated_at = Normalize.initJsonString(data,'updated_at');
        this.name_course = Normalize.initJsonString(data,'name_course');
        this.description = Normalize.initJsonString(data,'description');
        this.subject = Normalize.initJsonString(data,'subject');
    }

    copyFrom = (data: Record<string, any>): CourseModel => {
        if (this.raw) {
            return new CourseModel({...this.raw, ...data})
        } else {
            return new CourseModel(data)
        }
    }
}



