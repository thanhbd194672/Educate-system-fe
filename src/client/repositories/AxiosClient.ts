import axios, {AxiosRequestConfig} from "axios"

import {WebConfig} from "@/client/config/WebConfig";

export class AxiosClient {
    protected static getConfig(): AxiosRequestConfig {
        const config: AxiosRequestConfig = {
            headers: {
                "Content-type": 'multipart/form-data',
                Accept: 'Application/json'
            },
            withCredentials: false
        }
        const webConfig = WebConfig.getInstance()

        if (webConfig.token) {
            config.headers!.Authorization = `Bearer ${webConfig.token}`
        }
        return config
    }

    static async get(
        url: string
    ) {
        const config = this.getConfig()
        const r = await axios
            .get(url, config);
        return r.data;
    }
    static async post(
        url: string,
        data?: Record<string, any>
    ) {
        const config = this.getConfig()
        const r = await axios
            .post(url, data, config);
        return r.data;
    }
}