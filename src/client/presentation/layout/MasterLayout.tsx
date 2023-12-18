import {FC, ReactNode} from "react";
import {HeaderLayout} from "./components/HeaderLayout";
import FooterLayout from "./components/FooterLayout";


export type T_MasterCtx = {
    tool: [ReactNode, (tool: ReactNode) => void]
}

export const MasterLayout: FC = _ => {



    return (
        <div>
            <div>
                <HeaderLayout/>
                <FooterLayout/>
            </div>
        </div>
    )
}




