import {Route, Routes} from "react-router-dom";
import LoginScreen from "./screens/Auth/LoginScreen";
import Dashboard from "@/client/presentation/screens/common/Dashboard";
import Error404 from "./screens/error/404";
import {PrivateRouter} from "@/client/presentation/layout/PrivateRouter";
import {HeaderLayout} from "@/client/presentation/layout/components/HeaderLayout";
import {MasterLayout} from "@/client/presentation/layout/MasterLayout";
export const App = () => {
    return (
        <Routes>
            <Route key={"*"} path={"*"} element={<Error404/>}></Route>
            <Route key={"login"} path={"/login"} element={<LoginScreen/>}/>


            <Route element={<MasterLayout/>}>
                <Route key={"home"} path={"/"} element={<PrivateRouter component={Dashboard}/>}/>
            </Route>
        </Routes>
    )
}
