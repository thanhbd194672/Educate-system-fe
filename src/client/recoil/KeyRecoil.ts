import {Utils} from "../core/Utils";
import {v4 as uuid} from "uuid";

const createKey = (key: string) => {
    if (Utils.isDev()) {
        return `${key}-${uuid()}`
    }

    return key
}

// Init Tracking
export const KeyIT = createKey("it")

// Config
export const KeyTheme = createKey("theme")

// Account
export const KeyMe = createKey("me")

// User Login History
export const KeyLoginHistory = createKey('UserLoginHistory')

export const KeyAddCourse = createKey('AddCourse')

export const KeyGetTopic = createKey('GetTopic')
export const KeyGetItemTopic = createKey('GetItemTopic')
export const KeyGetVideo = createKey('GetVideo')
export const KeyGetExam = createKey('GetExam')
export const KeyGetExamQuestion = createKey('GetExamQuestion')
export const KeyGetTeacher = createKey("GetTeacher")
export const KeyGetDoc = createKey('GetDocument')

export const KeyLanguage = createKey('language')
