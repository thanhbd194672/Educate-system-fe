import {Route, Routes} from "react-router-dom";
import LoginScreen from "./screens/Auth/LoginScreen";
import Dashboard from "@/client/presentation/screens/Common/Dashboard";
import Error404 from "./screens/error/404";
import {PrivateRouter} from "@/client/presentation/layout/PrivateRouter";
import {MasterLayout} from "@/client/presentation/layout/MasterLayout";
import AddCourseScreen from "@/client/presentation/screens/Course/AddCourseScreen";
import TopicScreen from "@/client/presentation/screens/Course/Topic/TopicScreen";
import TopicItemScreen from "@/client/presentation/screens/Course/Topic/TopicItemScreen";
import VideoScreen from "@/client/presentation/screens/Course/Topic/VideoScreen";
import ExamScreen from "@/client/presentation/screens/Course/Topic/ExamScreen";
import DocScreen from "@/client/presentation/screens/Course/Topic/DocScreen";
import ExamQuestionScreen from "@/client/presentation/screens/Course/Topic/ExamQuestionScreen";
import ListCourseScreen from "@/client/presentation/screens/Course/ListCourseScreen";
import TeacherScreen from "@/client/presentation/screens/user/TeacherScreen";
export const App = () => {
    return (
        <Routes>
            <Route key={"*"} path={"*"} element={<Error404/>}></Route>
            <Route key={"login"} path={"/login"} element={<LoginScreen/>}/>


            <Route element={<MasterLayout/>}>
                <Route key={"home"} path={"/"} element={<PrivateRouter component={Dashboard}/>}/>
                <Route key={"CourseAdd"} path={"/courseAdd"} element={<PrivateRouter component={AddCourseScreen}/>}/>
                <Route key={"GetTeacher"} path={"/getTeacher"} element={<PrivateRouter component={TeacherScreen}/>}/>
                <Route key={"GetListCourse"} path={"/getListCourse"} element={<PrivateRouter component={ListCourseScreen}/>}/>
                <Route key={"GetTopic"} path={"/getTopic"} element={<PrivateRouter component={TopicScreen}/>}/>
                <Route key={"GetItemTopic"} path={"/getTopic/detail"} element={<PrivateRouter component={TopicItemScreen}/>}/>
                <Route key={"GetVideoTopic"} path="/getTopic/detail/video" element={<PrivateRouter component={VideoScreen}/>}/>
                <Route key={"GetExamTopic"} path="/getTopic/detail/exam" element={<PrivateRouter component={ExamScreen}/>}/>
                <Route key={"GetDocTopic"} path="/getTopic/detail/doc" element={<PrivateRouter component={DocScreen}/>}/>
                <Route key={"GetExamQuestion"} path="/getTopic/detail/exam/question" element={<PrivateRouter component={ExamQuestionScreen}/>}/>
            </Route>
        </Routes>
    )
}
