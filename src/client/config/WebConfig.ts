export class WebConfig {
    protected static instance: WebConfig

    static getInstance(): WebConfig {
        if (!WebConfig.instance) {
            WebConfig.instance = new WebConfig()
        }
        return WebConfig.instance
    }

    token?: string
    id?: string
}