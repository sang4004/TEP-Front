import FuseScrollbars from "fuse/lib/core/FuseScrollbars";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import useTheme from "@material-ui/core/styles/useTheme";
import Navigation from "./Navigation";
import UserNavbarHeader from "./UserNavbarHeader";
import React from "react";
import clsx from "clsx";
import styled from "styled-components";

const useStyles = makeStyles(theme => ({
    root: {
        "& ::-webkit-scrollbar-thumb": {
            boxShadow: `inset 0 0 0 20px ${
                theme.palette.type === "light" ? "rgba(0, 0, 0, 0.24)" : "rgba(255, 255, 255, 0.24)"
            }`,
        },
        "& ::-webkit-scrollbar-thumb:active": {
            boxShadow: `inset 0 0 0 20px ${
                theme.palette.type === "light" ? "rgba(0, 0, 0, 0.37)" : "rgba(255, 255, 255, 0.37)"
            }`,
        },
        backgroundColor: "white",
    },
    content: {
        overflowX: "hidden",
        overflowY: "auto",
        "-webkit-overflow-scrolling": "touch",
        background:
            "linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 40px, 100% 10px",
        backgroundAttachment: "local, scroll",
    },
}));
function NavbarLayout1(props) {
    const classes = useStyles();
    const theme = useTheme();

    const onClickHome = () => {
        window.localStorage.setItem("hdc_past_path", "");
        
        if (location.href.indexOf("edms") != -1) location.href = "/edms/home";
        else location.href = "/dshome";
    };
    return (
        <div
            className={clsx("flex flex-col overflow-hidden h-full", classes.root, props.className)}
        >
            <AppBarWrap
                color="primary"
                position="static"
                className={
                    "flex flex-row items-center flex-shrink px-12 shadow-0 " + props.navBarClassName
                }
                style={props.appBarStyle ? props.appBarStyle[0] : null}
            >
                <LeftCon onClick={onClickHome}>
                    통영에코파워
                    {/* <LogoImg 
						className="logo-icon" 
						alt="logo"
						style={{backgroundImage : `url('${LogoSvg}')`}}
						/> */}
                </LeftCon>
                {/* <RightBtn>
					<RightBtnImg src={ListSvg} />
				</RightBtn> */}
            </AppBarWrap>
            <ScrollBarWrap className={clsx(classes.content)} option={{ suppressScrollX: true }}>
                <UserNavbarHeader {...props} />
                <Navigation layout="vertical" {...props} />
            </ScrollBarWrap>
        </div>
    );
}

const AppBarWrap = styled(AppBar)`
    background-color: #f7f8f8;
`;

const ScrollBarWrap = styled(FuseScrollbars)`
    background-color: #f7f8f8;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const LeftCon = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    padding-left: 20px;
    align-items: center;
    height: 100%;
    cursor: pointer;
    width: 100%;
    font-size: 2em;
    color: black;
`;

const LogoImg = styled.div`
    background-size: contain;
    background-repeat: no-repeat;
    width: 60%;
    height: 100%;
    background-position-y: center;
    overflow: visible;
`;

const RightBtn = styled(Button)`
    min-width: 64px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
`;

const RightBtnImg = styled.img`
    width: 50%;
    height: auto;
`;

export default React.memo(NavbarLayout1);
