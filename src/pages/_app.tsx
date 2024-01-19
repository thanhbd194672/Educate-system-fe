import type {AppProps} from 'next/app'
import {BrowserRouter} from "react-router-dom";
import React, {Fragment, ReactNode, useEffect, useState} from "react";
import {Provider as InversifyProvider} from "inversify-react";
import {container} from "@/client/config/InversifyConfig";
import {RecoilRoot} from "recoil";
import {SessionContextProvider} from "@/client/presentation/contexts/SessionContext";
import '../style/globals.scss';
import{ CourseContextProvider} from "@/client/presentation/contexts/CourseNameContext";

export default function App({Component, pageProps}: AppProps) {
    const [render, setRender] = useState<ReactNode>()

    useEffect(() => {
        setRender(
            <Fragment>
                <BrowserRouter>
                    <InversifyProvider container={container}>
                        <RecoilRoot>
                            <SessionContextProvider>
                                <CourseContextProvider>
                                    <Component {...pageProps} />
                                </CourseContextProvider>
                            </SessionContextProvider>
                        </RecoilRoot>
                    </InversifyProvider>
                </BrowserRouter>
            </Fragment>
        )

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {render ?? null}
        </>
    )
}
