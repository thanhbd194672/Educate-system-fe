import {injectable} from "inversify";
import {container} from "./InversifyConfig";
@injectable()
export class WebConfig {

    public static getInstance(): WebConfig {
        return container.get(WebConfig);
    }

    token?: string
    id?: string
}