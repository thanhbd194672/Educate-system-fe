export enum E_SendingStatus {
    loading,
    idle,
    complete,
    success,
    failure,
    error,
    warning,
    disConnect,
    unauthorized,
    serverError,
    maintenance,
}
export enum E_ResCode {
    HTTP_OK = 200,
    HTTP_BAD_REQUEST = 400,
    HTTP_UNAUTHORIZED = 401,
    HTTP_INTERNAL_SERVER_ERROR = 500,
    HTTP_SERVICE_UNAVAILABLE = 503
}