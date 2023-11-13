import React, {useEffect} from 'react';
import {Alert, Button, Checkbox, Form, Input} from 'antd';
import {useNavigate} from "react-router";
import {LoginAction} from "@/client/recoil/auth/LoginAction";
import {E_SendingStatus} from "@/client/const/Types";
import {T_UserLoginV0} from "@/client/model/UserModel";
import {useSessionContext} from "@/client/presentation/contexts/SessionContext";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const App: React.FC = () => {
    const navigate = useNavigate()
    const [session] = useSessionContext()
    const {
        vm,
        dispatchLogin,
    } = LoginAction()



    useEffect(() => {
        if (vm.isLoading === E_SendingStatus.success) {
            navigate(session.redirectPath)
        }
    }, [vm.isLoading]);

    const onFinish = (values: T_UserLoginV0) =>{
        console.log('onFinish:', values)
        dispatchLogin(values)
    }
    const onFinishFailed = (errorInfo: any) => {
        console.log('onFinishFailed:', errorInfo)
    }

    return (
        <div className="cover" style={{
            height: '100vh',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(#FFFDE4,#005AA7)",

        }}>
            <div className="outsideForm" style={{
                display: "flex",
                height: "400px",
                width: "600px",
                border: "solid 1px #C0C0C0",
                backgroundColor: "#F6FDFA",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <div className="form-align" style={{
                    height: "300px",
                    width: "500px",
                }}>
                    <Form
                        name="basic"
                        labelCol={{span: 6}}
                        wrapperCol={{span: 16}}
                        style={{
                            margin: "auto",
                            maxWidth: 600,
                        }}
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <h2 style={{textAlign: "center" , marginBottom: "20px"}}>Login</h2>

                        <Form.Item<FieldType>
                            label="Username"
                            name="username"
                            rules={[{required: true, message: 'Please input your username!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Password"
                            name="password"
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input.Password/>
                        </Form.Item>
                        {
                            (vm.error) && (

                                <Alert message={Object.values(vm.error)[0]} type="error" style={{color : "red"}}/>
                            )
                        }
                        <Form.Item<FieldType>
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{offset: 6, span: 16}}
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{offset: 6, span: 16}}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={vm.isLoading === E_SendingStatus.loading}
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
};

export default App;