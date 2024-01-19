import {useEffect, useState} from "react";
import {useSessionContext} from "@/client/presentation/contexts/SessionContext";
import {Button, Divider, Space} from "antd";
import {WebConfig} from "@/client/config/WebConfig";
import {AxiosClient} from "@/client/repositories/AxiosClient";
import {App} from "@/client/const/App";
import React from 'react';
import {CourseAction} from "@/client/recoil/course/CourseAction";
import {UrlQuery} from "@/client/core/UrlQuery";
import {CourseModel, T_QueryVO} from "@/client/model/CourseModel";
import {useNavigate} from "react-router";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {useCourseContext} from "@/client/presentation/contexts/CourseNameContext";
import {TeacherAction} from "@/client/recoil/account/TeacherAction";


const Dashboard = () => {
    const {
        vm: vmCourse,
        dispatchGetCourse
    } = CourseAction();
    const {
        vm: vmTeacher,
        dispatchGetTeacher
    } = TeacherAction()
    const navigate = useNavigate()
    const [courseName, setCourseName] = useCourseContext()
    const URL = new UrlQuery(location.search)
    const page = URL.getInt("page", vmCourse.query.page)
    const limit = URL.getInt("limit", vmCourse.query.limit)
    const [queryParams, setQueryParams] = useState<T_QueryVO>({
        page: page,
        limit: limit,
    })

    useEffect(() => {
        console.log('MOUNT: HomeScreen')
        dispatchGetCourse(new UrlQuery(queryParams).toObject());
        // console.log();
        return () => {
            console.log('UNMOUNT: HomeScreen')
        }

    }, [])

    useEffect(() => {
        console.log('MOUNT: HomeScreen')
        dispatchGetTeacher(new UrlQuery(queryParams).toObject());
        // console.log();
        return () => {
            console.log('UNMOUNT: HomeScreen')
        }

    }, [])

    const setContext = (name_course_click : string) => {
        setCourseName({
            name_course : name_course_click
        })
        console.log(courseName)
        localStorage.setItem('name_course',name_course_click)
    };

    const urlQueryParams = new UrlQuery(queryParams)
    const nextPageChange = () => {
        urlQueryParams.set("page",Number(queryParams.page )+ 1)
        console.log(urlQueryParams)
        dispatchGetCourse(urlQueryParams.toObject());
        setQueryParams(urlQueryParams.toObject())
        // setQueryParams((prevParam)=> ({
        //     ...prevParam,
        //     page : 2
        // }))
    }
    const prevPageChange = () => {
        urlQueryParams.set("page", Number(queryParams.page) - 1)
        console.log(urlQueryParams)
        dispatchGetCourse(urlQueryParams.toObject());
        setQueryParams(urlQueryParams.toObject())

        // setQueryParams((prevParam)=> ({
        //     ...prevParam,
        //     page : 1
        // }))
    }
    //
    // useEffect(() => {
    //
    //     vmCourse.items.map((item) => {
    //         console.log(item)
    //     })
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [vmCourse.items])


    return (
        <div>
            <div className="flex items-center justify-center mt-4 mb-3 bg-green-main-custom">
                <img
                    className="items-center w-auto h-96"
                    src="@/../img/thumbnail.png"
                    alt="thumbnail"
                />
            </div>
            {/*course category*/}
            <div className="container 2xl mt-10">
                <div className="grid justify-content-center my-3">
                    <div className="flex items-center justify-center mb-1">
                        <div className="flex-col mr-1.5">
                            <div className="flex flex-row-reverse">
                                <div className="w-10 mb-1">
                                    <Divider
                                        className="m-0 h-1"
                                        style={{backgroundColor: '#34A259'}}>
                                    </Divider>
                                </div>
                            </div>
                            <div className="w-16">
                                <Divider
                                    className="m-0 h-1"
                                    style={{backgroundColor: '#34A259', margin: '0px'}}>
                                </Divider>
                            </div>
                        </div>

                        <div className="flex flex-col text-green-900 font-bold">
                            DANH MỤC
                        </div>

                        <div className="flex flex-col ml-1.5">
                            <div className="w-10 mb-1">
                                <Divider
                                    className="m-0 h-1"
                                    style={{backgroundColor: '#34A259'}}>
                                </Divider>
                            </div>
                            <div className="w-16">
                                <Divider
                                    className="m-0 h-1"
                                    style={{backgroundColor: '#34A259'}}>
                                </Divider>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-content-center font-bold text-3xl">
                        Danh mục môn học
                    </div>
                </div>

                {/*course categories*/}

                <div className="grid grid-cols-3 my-4 mx-14 bg-green-sub-custom">
                    <div className="grid grid-cols-1 col-span-2 justify-content-center my-3 mx-3">
                        <div className="flex justify-content-center relative max-h-72">
                            <img
                                className="w-full h-full object-cover "
                                src="@/../img/math.png"
                                alt="Subject"
                            />

                            <div className="bg-white text-center absolute bottom-0 right-0 py-2 px-3 m-1">
                                <h5>Toán</h5>
                                <small className="text-cyan-400">2 Khoá</small>
                            </div>

                        </div>
                        <div className="flex justify-content-center mt-3">
                            <div className="flex-col mr-1 w-1/2 relative max-h-60">
                                <img
                                    className=" w-full h-full object-cover"
                                    src="@/../img/physics.png"
                                    alt="Subject"
                                />

                                <div className="bg-white text-center absolute bottom-0 right-0 py-2 px-3 m-1">
                                    <h5>Vật lí</h5>
                                    <small className="text-cyan-400">2 Khoá</small>
                                </div>

                            </div>
                            <div className="flex-col ml-1 w-1/2 relative max-h-60">
                                <img
                                    className=" w-full h-full object-cover"
                                    src="@/../img/history.png"
                                    alt="Subject"
                                />
                                <div className="bg-white text-center absolute bottom-0 right-0 py-2 px-3 m-1">
                                    <h5>Lịch sử</h5>
                                    <small className="text-cyan-400">1 Khoá</small>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="flex col-span-1 justify-content-center my-3 mx-3 nax-h-100 relative">
                        <img
                            className="w-full h-full object-cover"
                            src="@/../img/chemistry.png"
                            alt="Subject"
                        />

                        <div className="bg-white text-center absolute bottom-0 right-0 py-2 px-3 m-1">
                            <h5>Hoá học</h5>
                            <small className="text-cyan-400">1 Khoá</small>
                        </div>

                    </div>
                </div>
            </div>
            {/*popular course*/}
            <div className="container 2xl mt-10">
                <div className="grid justify-content-center my-3">
                    <div className="flex items-center justify-center mb-1">
                        <div className="flex-col mr-1.5">
                            <div className="flex flex-row-reverse">
                                <div className="w-10 mb-1">
                                    <Divider
                                        className="m-0 h-1"
                                        style={{backgroundColor: '#34A259'}}>
                                    </Divider>
                                </div>
                            </div>
                            <div className="w-16">
                                <Divider
                                    className="m-0 h-1"
                                    style={{backgroundColor: '#34A259', margin: '0px'}}>
                                </Divider>
                            </div>
                        </div>

                        <div className="flex flex-col text-green-900 font-bold">
                            KHOÁ HỌC
                        </div>

                        <div className="flex flex-col ml-1.5">
                            <div className="w-10 mb-1">
                                <Divider
                                    className="m-0 h-1"
                                    style={{backgroundColor: '#34A259'}}>
                                </Divider>
                            </div>
                            <div className="w-16">
                                <Divider
                                    className="m-0 h-1"
                                    style={{backgroundColor: '#34A259'}}>
                                </Divider>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-content-center font-bold text-3xl">
                        Khoá học phổ biến
                    </div>
                </div>
                <div className="grid grid-cols-3 my-3 mx-8 py-3 px-6 bg-green-sub-custom position-relative">
                    {Number(vmCourse.oMeta?.currentPage)> 1 && (
                        <Button shape="circle" style={{position: 'absolute', bottom: "50%"}} icon={<LeftOutlined/>}
                                onClick={prevPageChange}>

                        </Button>)
                    }
                    {vmCourse.items.map(item => (
                        <div key={item.id} className="flex flex-col bg-white mx-2">
                            <Link to={{
                                pathname: '/getTopic',
                                search: `id=${item.id}`,
                            }}
                                  onClick = {()=>setContext(String(item.name_course))}
                                  className = "mt-auto"
                            style = {{color: "black",textDecoration: "none"}}
                            >
                            <img
                                className="w-full h-72 my-2 mx-auto"
                                src={item.image}
                                alt="Subject"
                            />
                            <div className="text-center my-2">
                                <h3 className="mb-0">{item.name_course}</h3>
                                <div className="flex justify-content-center my-2">
                                    <svg className="w-4 h-4 text-green-400 ms-1" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path
                                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                    </svg>
                                    <svg className="w-4 h-4 text-green-400 ms-1" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path
                                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                    </svg>
                                    <svg className="w-4 h-4 text-green-400 ms-1" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path
                                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                    </svg>
                                    <svg className="w-4 h-4 text-green-400 ms-1" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path
                                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                    </svg>
                                    <svg className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path
                                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                    </svg>
                                </div>
                                <h5>{item.price} VNĐ</h5>
                            </div>
                            <div className="flex flex-row text-center mt-2">
                                <div className="w-1/3 bg-green-100 font-bold p-2 border-solid border">Mr.Nguyen</div>
                                <div
                                    className="w-1/3 bg-green-100 font-bold p-2 border-solid border">{item.time_to_learn}</div>
                                <div className="w-1/3 bg-green-100 font-bold p-2 border-solid border">50 Sinh viên</div>
                            </div>
                            </Link>
                        </div>
                    ))}
                    {vmCourse.oMeta?.nextPage && (
                        <Button shape="circle" style={{position: 'absolute', bottom: "50%", right: 0}}
                                icon={<RightOutlined/>} onClick={nextPageChange}>

                        </Button>
                    )}
                </div>
            </div>
            {/*popular lecture*/}
            <div className="container 2xl mt-10">
                <div className="grid justify-content-center my-3">
                    <div className="flex items-center justify-center mb-1">
                        <div className="flex-col mr-1.5">
                            <div className="flex flex-row-reverse">
                                <div className="w-10 mb-1">
                                    <Divider
                                        className="m-0 h-1"
                                        style={{backgroundColor: '#34A259'}}>
                                    </Divider>
                                </div>
                            </div>
                            <div className="w-16">
                                <Divider
                                    className="m-0 h-1"
                                    style={{backgroundColor: '#34A259', margin: '0px'}}>
                                </Divider>
                            </div>
                        </div>

                        <div className="flex flex-col text-green-900 font-bold">
                            GIÁO VIÊN
                        </div>

                        <div className="flex flex-col ml-1.5">
                            <div className="w-10 mb-1">
                                <Divider
                                    className="m-0 h-1"
                                    style={{backgroundColor: '#34A259'}}>
                                </Divider>
                            </div>
                            <div className="w-16">
                                <Divider
                                    className="m-0 h-1"
                                    style={{backgroundColor: '#34A259'}}>
                                </Divider>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-content-center font-bold text-3xl">
                        Giáo viên tiêu biểu
                    </div>
                </div>
                <div className="grid grid-cols-3 my-3 mx-14 py-3 bg-green-sub-custom ">
                    {vmTeacher.items.map(item => (
                    <div key={item.id} className="flex flex-col bg-white mx-2  ">
                        <img
                            className="w-40 h-40 my-2 mx-auto"
                            src={item.avatar}
                            alt="avatar"
                        />
                        <div className="text-center my-2">
                            <h3 className="mb-0">{item.gender == "male" ? "Thầy" : "Cô"} {item.name}</h3>
                            <div className="flex justify-content-center my-2">
                                <svg className="w-4 h-4 text-green-400 ms-1" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                                <svg className="w-4 h-4 text-green-400 ms-1" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                                <svg className="w-4 h-4 text-green-400 ms-1" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                                <svg className="w-4 h-4 text-green-400 ms-1" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                                <svg className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                            </div>
                            <h5 className="px-2">Thầy giáo tận tâm với học sinh, bài giảng dễ hiểu, bài tập có lời giải
                                và rất bổ ích</h5>
                        </div>
                    </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Dashboard