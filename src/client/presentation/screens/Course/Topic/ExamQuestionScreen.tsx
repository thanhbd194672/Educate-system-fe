import {ExamQuestionAction} from "@/client/recoil/course/topic/Exam/ExamQuestion/ExamQuestionAction";
import {useLocation, useNavigate} from "react-router";
import {useSessionContext} from "@/client/presentation/contexts/SessionContext";
import {UrlQuery} from "@/client/core/UrlQuery";
import {useEffect, useState} from "react";
import {T_QueryVO} from "@/client/model/CourseModel";
import {Button, Divider, Input} from "antd";
import {Link} from "react-router-dom";
import {useCourseContext} from "@/client/presentation/contexts/CourseNameContext";
import CountdownTimer from "@/client/presentation/layout/components/CountdownTimer";

const ExamQuestionScreen = () => {
    const {
        vm: vmExamQuestion,
        dispatchGetExamQuestion
    } = ExamQuestionAction();

    const navigate = useNavigate()
    const [courseNameContext] = useCourseContext()
    const URL = new UrlQuery(location.search)
    const page = URL.getInt("page", vmExamQuestion.query.page)
    const limit = URL.getInt("limit", vmExamQuestion.query.limit)
    const search = useLocation().search;
    const id = new URLSearchParams(search).get("id");
    const [queryParams, setQueryParams] = useState<T_QueryVO>({
        page: page,
        limit: limit,
    })

    const handleSubmit = () => {
        alert("Bạn đã nộp bài !")
        navigate(-1);
    }

    useEffect(() => {
        console.log('MOUNT: HomeScreen')
        dispatchGetExamQuestion(new UrlQuery(queryParams).toObject(), id);
        return () => {
            console.log('UNMOUNT: HomeScreen')
        }

    }, [])

    useEffect(() => {

        vmExamQuestion.items.map((item) => {
            console.log(item)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vmExamQuestion.items])
    return (
        <>
            <div className="container 2xl ">
                <div className="my-3">
                    <h2> Khoá học : {courseNameContext.name_course} </h2>
                    <Divider className="m-0 h-0.5" style={{backgroundColor: '#000000', margin: '0px'}}></Divider>
                </div>
                <div className="flex flex-col mt-4 mb-3 bg-green-sub-custom">
                    <div className="">Thời gian làm bài : <CountdownTimer initialTime={String(courseNameContext.time_to_do)} /> </div>
                    <div className="bg-white">
                        {vmExamQuestion.items.map((item, index) => (
                            <div key={item.id_question} className="flex flex-col my-2 mx-2 px-3">
                                Câu {index + 1} : {item.detail?.content}
                                {item.detail?.type == "Trắc nghiệm" ?
                                    <div>
                                        {Object.entries(item.detail?.answer || {}).map(([key, value]) => (
                                            <div>
                                                <input
                                                    type="radio"
                                                    id={key}
                                                    name="answer"
                                                    value={key}
                                                />
                                                <label className="ml-4"
                                                       key={`${item.id_question}-${key}`}>{value}</label>
                                            </div>
                                        ))}
                                    </div>
                                    :
                                    <Input.TextArea></Input.TextArea>
                                }

                            </div>
                        ))}
                        <div className="text-center mt-2 mb-3">
                            <Button
                                onClick={handleSubmit}
                            >Nộp bài</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExamQuestionScreen