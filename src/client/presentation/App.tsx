import {Route, Routes} from "react-router-dom";
import LoginScreen from "./screens/Auth/LoginScreen";
import Dashboard from "@/client/presentation/screens/Common/Dashboard";
import Error404 from "./screens/error/404";
import {PrivateRouter} from "@/client/presentation/layout/PrivateRouter";
import {MasterLayout} from "@/client/presentation/layout/MasterLayout";
import AddCourseScreen from "@/client/presentation/screens/Course/AddCourseScreen";
export const App = () => {
    return (
        <Routes>
            <Route key={"*"} path={"*"} element={<Error404/>}></Route>
            <Route key={"login"} path={"/login"} element={<LoginScreen/>}/>


            <Route element={<MasterLayout/>}>
                <Route key={"home"} path={"/"} element={<PrivateRouter component={Dashboard}/>}/>
                <Route key={"CourseAdd"} path={"/courseAdd"} element={<PrivateRouter component={AddCourseScreen}/>}/>
            </Route>
        </Routes>
    )
}
