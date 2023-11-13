import "reflect-metadata";
import {Container} from "inversify";
import {ApiService} from "../repositories/ApiService";
import {WebConfig} from "./WebConfig";

const container = new Container();

container.bind(WebConfig).toSelf().inSingletonScope()
container.bind(ApiService).toSelf().inSingletonScope()

export {container}
