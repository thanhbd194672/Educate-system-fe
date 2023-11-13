import {useEffect, useState} from "react";
import {useSessionContext} from "@/client/presentation/contexts/SessionContext";
import {Button, Divider, Space} from "antd";
import {WebConfig} from "@/client/config/WebConfig";
import {AxiosClient} from "@/client/repositories/AxiosClient";
import {App} from "@/client/const/App";
import React from 'react';
import type { ColumnsType } from 'antd/es/table';


const Dashboard = () => {
    const [session, setSession] = useSessionContext()
    const webConfig = WebConfig.getInstance()

    useEffect(() => {
        console.log('MOUNT: HomeScreen')

        return () => {
            console.log('UNMOUNT: HomeScreen')
        }

    }, [])

    const onGetMe = () => {
        console.log(session.isAuthenticated)
        AxiosClient
            .get(`${App.ApiUrl}/v2/account/me`)
            .then(r => {
                console.log('oke', r)
            })
            .catch(e => {
                console.log('err', e)
            })
    }


    return (
        <>
            Welcome HomeScreen
            <Divider/>
            <Space>
                <Button onClick={onGetMe}>Get Me</Button>
            </Space>
        </>
    )
}

export default Dashboard