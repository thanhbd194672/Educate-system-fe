import {Model} from "@/client/model/Model";
import {Normalize} from "@/client/core/Normalize";
import moment from "moment";
import {App} from "@/client/const/App";

export type T_UserLoginV0 = {
    username: string
    password: string
}

export class UserModel extends Model {
    id?: string
    username?: string
    name?: string
    gender?: string
    email?: string
    role?: string
    telephoneNumber ?: string
    accessToken?: AccessTokenModel

    constructor(data: Record<string, any>) {
        super(data);
        this.id = Normalize.initJsonString(data, 'user_info')
        this.username = Normalize.initJsonString(data, 'username')
        this.email = Normalize.initJsonString(data,'email')
        this.gender = Normalize.initJsonString(data,'gender')
        this.name = Normalize.initJsonString(data, 'first_name')?.concat(Normalize.initJsonString(data,'last_name') ?? '')
        this.role = Normalize.initJsonString(data,'role') == '1' ? 'Student' :'Teacher'
        this.accessToken = Normalize.initJsonObject(data, 'access_token', v => new AccessTokenModel(v))
    }
}

export class AccessTokenModel extends Model {
    token?: string
    tokenType?: string
    createdAt?: string
    createdAtFormatted = (format: string = App.FormatToMoment): string => moment(this.createdAt, App.FormatISOFromMoment).format(format)

    constructor(data: Record<string, any>) {
        super(data);
        this.token = Normalize.initJsonString(data, 'token')
        this.createdAt = Normalize.initJsonString(data, 'created_at')
        this.tokenType = Normalize.initJsonString(data, 'token_type')
    }

}

