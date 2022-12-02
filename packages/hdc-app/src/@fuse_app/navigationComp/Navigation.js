import FuseNavigation from "./FuseNavigation";
import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import { selectNavigation } from "fuse_app/lib/store/fuse/navigationSlice";
import { GridNavigationComponent } from "components";
import { CountPingComp } from "../../components";

function Navigation(props) {
    const navigation = useSelector(selectNavigation);
    return (
        <>
            <style>
                {/* #94999b = rgb(148, 153, 155) */}
                {`  .navigation::-webkit-scrollbar {
                     
                        width: px;
                        height: 14px;
                        background-color: rgba(0, 0, 0, 0);
                }
                    .navigation::-webkit-scrollbar-thumb{
                        background-color: #94999b; 
                        border:2px;
                        
                    }
                `}
            </style>
            <FuseNavigation
                className={clsx("navigation", props.className)}
                navigation={navigation}
                layout={props.layout}
                dense={props.dense}
                active={props.active}
                pointerEvents={props.pointerEvents}
            />
            <CountPingComp path={props.path} />
        </>
    );
}

Navigation.defaultProps = {
    layout: "vertical",
};

export default React.memo(Navigation);
