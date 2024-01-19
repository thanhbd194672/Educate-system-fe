import {TeacherAction} from "@/client/recoil/account/TeacherAction";
import { useNavigate} from "react-router";
import {useSessionContext} from "@/client/presentation/contexts/SessionContext";
import {UrlQuery} from "@/client/core/UrlQuery";
import {useEffect, useState} from "react";
import {T_UserVO} from "@/client/model/UserModel";

const TeacherScreen = () => {
    const {
        vm: vmTeacher,
        dispatchGetTeacher
    } = TeacherAction();

    const navigate = useNavigate()
    const [session, setSession] = useSessionContext()
    const URL = new UrlQuery(location.search)
    const page = URL.getInt("page", vmTeacher.query.page)
    const limit = URL.getInt("limit", vmTeacher.query.limit)
    const [queryParams, setQueryParams] = useState<T_UserVO>({
        page: 1,
        limit: 10,
    })

    useEffect(() => {
        console.log('MOUNT: HomeScreen')
        dispatchGetTeacher(new UrlQuery(queryParams).toObject());
        return () => {
            console.log('UNMOUNT: HomeScreen')
        }

    }, [])

    useEffect(() => {

        vmTeacher.items.map((item) => {
            console.log(item)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vmTeacher.items])
    return (
        <>
            <div className="container 2xl ">
                <h3 className="mt-3">Thầy cô giáo</h3>
                <div className="grid grid-cols-2 my-3">
                    {vmTeacher.items.map((item, index) => (
                        <div key={item.id} className=" flex flex-row mt-4 mb-3 mx-2 bg-white px-3 py-3">
                            <h4>{item.gender == "male" ? "Thầy" : "Cô"} {item.name}</h4>
                            <img  className = "ml-auto h-20 w-auto" src= {item.avatar} alt = "avatar"></img>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default TeacherScreen