import {VideoAction} from "@/client/recoil/course/topic/Video/VideoAction";
import {useLocation} from "react-router";
import {useEffect, useState} from "react";
import {Divider} from "antd";
import {Link} from "react-router-dom";
import {UrlQuery} from "@/client/core/UrlQuery";
import {T_QueryVO} from "@/client/model/CourseModel";
import {useCourseContext} from "@/client/presentation/contexts/CourseNameContext";

const VideoScreen = () => {
    const {
        vm: vmVideo,
        dispatchGetVideo
    } = VideoAction();
    const [courseNameContext] = useCourseContext()
    const URL = new UrlQuery(location.search)
    const page = URL.getInt("page", vmVideo.query.page)
    const limit = URL.getInt("limit", vmVideo.query.limit)
    const search = useLocation().search;
    const id = new URLSearchParams(search).get("id");
    const [queryParams, setQueryParams] = useState<T_QueryVO>({
        page: page,
        limit: limit,
    })

    useEffect(() => {
        console.log('MOUNT: HomeScreen')
        dispatchGetVideo(new UrlQuery(queryParams).toObject(), id);
        return () => {
            console.log('UNMOUNT: HomeScreen')
        }

    }, [])

    useEffect(() => {

        console.log(vmVideo.data)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vmVideo.data])
    return (
        <>
            <div className="container 2xl ">
                <div className="my-3">
                    <h2> Khoá học : {courseNameContext.name_course} </h2>
                    <h3>Bài : {courseNameContext.name_topic}</h3>
                    <Divider className="m-0 h-0.5" style={{backgroundColor: '#000000', margin: '0px'}}></Divider>
                </div>
                <div className="flex flex-col mt-4 mb-3 bg-green-sub-custom">
                    <h4 className="mx-3 my-2">
                        {vmVideo.data?.name}
                    </h4>
                    <div className=" mb-4 flex items-center justify-content-center text-center">
                        <video width="640" height="360" controls>
                            <source src={String(vmVideo.data?.video)} type="video/mp4"></source>
                        </video>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoScreen