import {ExamAction} from "@/client/recoil/course/topic/Exam/ExamAction";
import {useLocation, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {Button, Divider} from "antd";
import {Link} from "react-router-dom";
import {UrlQuery} from "@/client/core/UrlQuery";
import {T_QueryVO} from "@/client/model/CourseModel";
import {useCourseContext} from "@/client/presentation/contexts/CourseNameContext";
import CountdownTimer from "@/client/presentation/layout/components/CountdownTimer";

const ExamScreen = () => {
    const {
        vm: vmExam,
        dispatchGetExam
    } = ExamAction();
    const navigate = useNavigate();
    const [courseNameContext,setCourseName] = useCourseContext()
    const URL = new UrlQuery(location.search)
    const page = URL.getInt("page", vmExam.query.page)
    const limit = URL.getInt("limit", vmExam.query.limit)
    const search = useLocation().search;
    const id = new URLSearchParams(search).get("id");
    const [queryParams, setQueryParams] = useState<T_QueryVO>({
        page: page,
        limit: limit,
    })
    const handleDoExamClick = (id?: string,time?:string) => {
        setCourseName({
            ...courseNameContext,
            time_to_do :time
        })
        // localStorage.setItem('time_to_do',String(time))
        // Navigate to a new route
        navigate(`question?id=${id}`);

    };


    useEffect(() => {
        console.log('MOUNT: HomeScreen')
        dispatchGetExam(new UrlQuery(queryParams).toObject(), id);
        return () => {
            console.log('UNMOUNT: HomeScreen')
        }

    }, [])

    useEffect(() => {

        console.log(vmExam.data)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vmExam.data])
    return (
        <>
            <div className="container 2xl ">
                <div className="my-3">
                    <h2> Khoá học : {courseNameContext.name_course} </h2>
                    <h3>Bài : {courseNameContext.name_topic}</h3>
                    <Divider className="m-0 h-0.5" style={{backgroundColor: '#000000', margin: '0px'}}></Divider>
                </div>
                <div className="flex flex-col mt-4 mb-3 bg-green-sub-custom">
                    {/*<Link to={{*/}
                    {/*    pathname: 'question',*/}
                    {/*    search: `id=${vmExam.data?.id}`,*/}
                    {/*}}*/}
                    {/*      style={{color: "black", textDecoration: "none"}}*/}
                    {/*>*/}
                        <div className="my-3 mx-10 text-center bg-white">
                            <h3 className= "mt-3">{vmExam.data?.name}</h3>
                            Thời gian làm bài: {vmExam.data?.time_to_do}
                            <div className="my-3">
                                <Button onClick={() => handleDoExamClick(vmExam.data?.id,vmExam.data?.time_to_do)}>Làm Bài</Button>
                            </div>
                        </div>

                    {/*</Link>*/}
                </div>
            </div>
        </>
    )
}

export default ExamScreen