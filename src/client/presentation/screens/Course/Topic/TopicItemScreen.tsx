import {TopicItemAction} from "@/client/recoil/course/topic/TopicItemAction";
import {useLocation, useNavigate} from "react-router";
import {useSessionContext} from "@/client/presentation/contexts/SessionContext";
import {UrlQuery} from "@/client/core/UrlQuery";
import {useEffect, useState} from "react";
import {T_TopicItemVO} from "@/client/model/TopicItemModel";
import {Button, Divider} from "antd";
import {Link} from "react-router-dom";
import {useCourseContext} from "@/client/presentation/contexts/CourseNameContext";

const TopicScreen = () => {
    const {
        vm: vmTopic,
        dispatchGetItemTopic
    } = TopicItemAction();

    const navigate = useNavigate()
    const [courseNameContext] = useCourseContext()
    const URL = new UrlQuery(location.search)
    const page = URL.getInt("page", vmTopic.query.page)
    const limit = URL.getInt("limit", vmTopic.query.limit)
    const search = useLocation().search;
    const id = new URLSearchParams(search).get("id");
    const [queryParams, setQueryParams] = useState<T_TopicItemVO>({
        page: page,
        limit: limit,
    })

    useEffect(() => {
        console.log('MOUNT: HomeScreen')
        dispatchGetItemTopic(new UrlQuery(queryParams).toObject(), id);
        return () => {
            console.log('UNMOUNT: HomeScreen')
        }

    }, [])

    useEffect(() => {

        vmTopic.items.map((item) => {
            console.log(item)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vmTopic.items])
    return (
        <>
            <div className="container 2xl ">
                <div className="my-3">
                    <h2> Khoá học : {courseNameContext.name_course} </h2>
                    <h3>Bài : {courseNameContext.name_topic}</h3>
                    <Divider className="m-0 h-0.5" style={{backgroundColor: '#000000', margin: '0px'}}></Divider>
                </div>
                <div className="flex flex-col mt-4 mb-3 bg-green-sub-custom">
                    {
                        vmTopic.items.map((item, index) => (
                            <div key = {item.id}>
                                <Link to={{
                                    pathname: item.type == "Video" ? "video" : (item.type == "Tài liệu" ? "doc" : "exam"),
                                    search: `id=${item.id}`
                                }}
                                      style={{color: "black", textDecoration: "none"}}
                                >
                                    <div className="flex flex-col mt-4 mb-3 mx-2 bg-white px-3 py-3">
                                        <h5>{item.type} : {item.name}</h5>
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </>
    )
}

export default TopicScreen