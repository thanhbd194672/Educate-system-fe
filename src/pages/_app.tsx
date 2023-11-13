import type {AppProps} from 'next/app'
import {BrowserRouter} from "react-router-dom";
import {Fragment, ReactNode, useEffect, useState} from "react";
import {SessionContextProvider} from "@/client/presentation/contexts/SessionContext";
import '../style/globals.scss';
export default function App({Component, pageProps}: AppProps) {
    const [render, setRender] = useState<ReactNode>()

    useEffect(() => {
        setRender(
            <Fragment>
                <BrowserRouter>
                    <SessionContextProvider>
                        <Component {...pageProps} />
                    </SessionContextProvider>
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