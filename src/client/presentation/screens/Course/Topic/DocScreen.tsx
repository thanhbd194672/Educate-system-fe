import {DocAction} from "@/client/recoil/course/topic/Document/DocAction";
import {useLocation} from "react-router";
import ReactHtmlParser from 'react-html-parser';
import {useEffect, useState} from "react";
import {Divider} from "antd";
import {UrlQuery} from "@/client/core/UrlQuery";
import {T_QueryVO} from "@/client/model/CourseModel";
import {useCourseContext} from "@/client/presentation/contexts/CourseNameContext";

const DocScreen = () => {
    const {
        vm: vmDoc,
        dispatchGetDoc
    } = DocAction();
    const [courseNameContext] = useCourseContext()
    const URL = new UrlQuery(location.search)
    const page = URL.getInt("page", vmDoc.query.page)
    const limit = URL.getInt("limit", vmDoc.query.limit)
    const search = useLocation().search;
    const id = new URLSearchParams(search).get("id");
    const [queryParams, setQueryParams] = useState<T_QueryVO>({
        page: page,
        limit: limit,
    })

    useEffect(() => {
        console.log('MOUNT: HomeScreen')
        dispatchGetDoc(new UrlQuery(queryParams).toObject(), id);
        return () => {
            console.log('UNMOUNT: HomeScreen')
        }

    }, [])

    useEffect(() => {

        console.log(vmDoc.data)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vmDoc.data])
    return (
        <>
            <div className="container 2xl ">
                <div className="my-3">
                    <h2> Khoá học : {courseNameContext.name_course} </h2>
                    <h3>Bài : {courseNameContext.name_topic}</h3>
                    <Divider className="m-0 h-0.5" style={{backgroundColor: '#000000', margin: '0px'}}></Divider>
                </div>
                <div className="flex flex-col mt-4 mb-3 bg-green-sub-custom">
                    <h3>{vmDoc.data?.name}</h3>
                    <div className="my-2 mx-3 p-3 bg-white">{ReactHtmlParser(String(vmDoc.data?.content))}</div>
                    <div className="my-2">
                        <h4>Tài liệu tham khảo</h4>
                        <a href= {vmDoc.data?.link_doc}>{vmDoc.data?.link_doc}</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DocScreen