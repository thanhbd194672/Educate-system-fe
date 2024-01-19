import {CourseAction} from "@/client/recoil/course/CourseAction";
import {useLocation, useNavigate} from "react-router";
import {useSessionContext} from "@/client/presentation/contexts/SessionContext";
import {UrlQuery} from "@/client/core/UrlQuery";
import {useEffect, useState} from "react";
import {T_QueryVO} from "@/client/model/CourseModel";
import {Divider} from "antd";
import {Link} from "react-router-dom";
import {useCourseContext} from "@/client/presentation/contexts/CourseNameContext";

const ListCourseScreen = () => {
    const {
        vm: vmCourse,
        dispatchGetCourse
    } = CourseAction();

    const navigate = useNavigate()
    const [courseName, setCourseName] = useCourseContext()
    const URL = new UrlQuery(location.search)
    const page = URL.getInt("page", vmCourse.query.page)
    const limit = URL.getInt("limit", vmCourse.query.limit)
    const search = useLocation().search;
    const id = new URLSearchParams(search).get("id");
    const [queryParams, setQueryParams] = useState<T_QueryVO>({
        page: 1,
        limit: 10,
    })
    const setContext = (name_course_click: string) => {
        setCourseName({
            name_course: name_course_click
        })
        localStorage.setItem('name_course',name_course_click)
    };

    useEffect(() => {
        console.log('MOUNT: HomeScreen')
        dispatchGetCourse(new UrlQuery(queryParams).toObject());
        return () => {
            console.log('UNMOUNT: HomeScreen')
        }

    }, [])

    useEffect(() => {

        vmCourse.items.map((item) => {
            console.log(item)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vmCourse.items])
    return (
        <>
            <div className="container 2xl ">
                <h3 className="mt-3">Danh sách khoá học</h3>
                <div className="grid grid-cols-2 my-3">
                    {vmCourse.items.map((item, index) => (
                        <div key={item.id} className="flex flex-col mt-4 mb-3 mx-2 bg-white px-3 py-3">
                            <Link to={{
                                pathname: '/getTopic',
                                search: `id=${item.id}`,

                            }}
                                  onClick={() => setContext(String(item.name_course))}
                                  style={{color: "black", textDecoration: "none"}}
                                  className = "grid grid-cols-2"
                            >
                                <h3>Khoá : {item.name_course}</h3>
                                <img className = "ml-auto h-20 w-auto" src = {item.image} alt ="Ảnh khoá học"></img>
                                {item.description}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ListCourseScreen