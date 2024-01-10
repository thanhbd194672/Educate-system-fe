import {Button, Form, Image, Input, Typography} from "antd";
import {useEffect, useRef, useState} from "react";
import {T_CourseState} from "@/client/recoil/course/CourseState";
import React from 'react';
import TextArea from "antd/lib/input/TextArea";
import { UndoOutlined } from '@ant-design/icons';
import {AddCourseAction} from "@/client/recoil/course/AddCourseAction";
import {CourseModel, T_Course} from "@/client/model/CourseModel";
import {ValidateErrorEntity} from "rc-field-form/lib/interface";

type _T_FormError = {
    [K in keyof T_Course]?: T_Course[K];
};
const AddCourseScreen = () => {
    const {vm,vmForm,dispatchAddCourse,dispatchResetState} = AddCourseAction();
    const [formErrors, setFormErrors] = useState<_T_FormError>({});
    const [formData, setFormData] = useState<T_CourseState>();
    const [form] = Form.useForm();
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [image, setImage] = useState<File>();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            // Read the image file and set the URL as the source
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
            setImage(file)
        }
    };
    const handleButtonClick = () => {
        // Trigger the file input click event when the button is clicked
        fileInputRef.current?.click();
    };

    const onFinish = (values: T_Course) => {
        const data: T_Course = {
            name_course: values.name_course,
            id: values.id, //not set
            teacher_id: values.teacher_id,
            status: 1,
            image: values.image,
            time_to_learn: values.time_to_learn,
            price: values.price,
            created_at: values.created_at,
            updated_at: values.updated_at,
            description: values.description,
            subject: values.subject
        }
        dispatchAddCourse(data)
    }
    const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
        let _formErrors = formErrors;
        errorInfo.errorFields.forEach((e) => {
            _formErrors = {
                ..._formErrors,
                [e.name[0]]: e.errors[0],
            };
        });
        setFormErrors(_formErrors);
    };

    useEffect(() => {
        form.setFieldValue('image', image);
        console.log('====================================');
        console.log(image);
        console.log('====================================');
        // setCoverImageUrl(coverImage[0].url);
    }, [image])

    return (
        <div>
            <div className="mx-44 my-10">
                <Typography.Title level={2} className={'mb-0'}>
                    Khoá học mới
                </Typography.Title>
                <hr className="h-px my-1 bg-green-800 border-none "/>
            </div>

            <Form
                form={form}
                name="addCourse"
                onFinish={onFinish}
                initialValues={{remember: true}}
                onFinishFailed={onFinishFailed}
                style={{
                    maxWidth: "100%",
                }}
            >
                <div className="grid grid-cols-3 mx-44">
                    <div className="grid grid-cols-2 col-span-2">
                        <div className="mx-5">
                            <Typography.Title level={5} className={'mb-0'}>
                                Tên khoá
                            </Typography.Title>
                            <Form.Item
                                key="name_course"
                                name="name_course"
                            >
                                <Input></Input>
                            </Form.Item>
                        </div>
                        <div className="mx-5">
                            <Typography.Title level={5} className={'mb-0'}>
                                Tên môn học
                            </Typography.Title>
                            <Form.Item
                                key="subject"
                                name="subject"
                            >
                                <Input></Input>
                            </Form.Item>
                        </div>

                        <div className="mx-5">
                            <Typography.Title level={5} className={'mb-0'}>
                                Thời gian học
                            </Typography.Title>
                            <Form.Item
                                key="time_to_learn"
                                name="time_to_learn"
                            >
                                <Input></Input>
                            </Form.Item>
                        </div>

                        <div className="mx-5">
                            <Typography.Title level={5} className={'mb-0'}>
                                Giá
                            </Typography.Title>
                            <Form.Item
                                key="price"
                                name="price"
                            >
                                <Input></Input>
                            </Form.Item>
                        </div>

                        <div className="mx-5">
                            <Typography.Title level={5} className={'mb-2'}>
                                Ảnh bìa khoá học
                            </Typography.Title>
                            <Form.Item
                                key="image"
                                name="image"
                            >
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    style={{display: 'none'}}
                                    ref={fileInputRef}
                                />
                                {imageSrc ?
                                    <div>
                                        <Image
                                            src={imageSrc}
                                            alt="preview"
                                        />
                                        <Button
                                            shape={"circle"}
                                            onClick={handleButtonClick}
                                            icon={<UndoOutlined />}
                                            size={"large"}
                                            className={"mt-2"}
                                        >
                                        </Button>
                                    </div>
                                    :
                                    <div>
                                        <Image
                                            src="@/../picture-choose.png"
                                            alt="addImage"
                                        />
                                        <Button
                                            shape={"circle"}
                                            onClick={handleButtonClick}
                                            size={"large"}
                                            className={"mt-2"}
                                        >+</Button>
                                    </div>
                                }

                            </Form.Item>
                        </div>
                        <div>
                            <div className="mx-5">
                                <Typography.Title level={5} className={'mb-0'}>
                                    Mô tả
                                </Typography.Title>
                                <Form.Item
                                    key="description"
                                    name="description">
                                    <TextArea style={{height: 120}}></TextArea>
                                </Form.Item>
                            </div>
                            <Button htmlType="submit" className="w-1/2 mx-5 my-auto">
                                Thêm mới
                            </Button>
                        </div>

                    </div>
                    <div>
                        <img className="w-full h-auto" src = "@/../accessority/background/addCourseBG.png" alt = "bg_addCourse"/>
                    </div>

                </div>
            </Form>
        </div>
    );
}

export default AddCourseScreen