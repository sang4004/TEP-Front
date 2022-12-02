/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * appwrapper/index.tsx
 * hooks :
 * useLocations
 *
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import { useState, useEffect, useContext, useRef } from "react"; // default hooks
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import clsx from "clsx";
import { renderRoutes } from "react-router-config";
//
// Module
import "./index.css";
import { useLocations } from "hooks"; // locations hooks
import { reducerState } from "../../common";
import {
    ChangeSignSelectModal,
    GetSignFormList,
    GetSignFormDetailList,
    GetGeneralCode,
    GetNormalDocumentUserList,
    GetAddressbook,
    GetAllList,
    GetIndexData,
    SetNowProject,
    GetStageCodes,
    GetEdmsAddress,
} from "../../common/action";
import { getConstants } from "utils_ts/lib";
import { LoadingIndicatorComponent } from "components";
//
// Fuse Module
import { setNavigation, updateNavigationItem } from "fuse_app/lib/store/fuse/navigationSlice";
import { Footer, Leftside, Rightside } from "fuse_app/lib/fuse-layouts/layout1/components/";
import { FuseDialog, FuseScrollbars, FuseSuspense } from "fuse/lib/core";
import AppContext from "fuse_app/lib/AppContext";
import Toolbar from "../../@fuse_app/ToolbarLayout";
import { NavbarWrapper } from "../../@fuse_app";
import { SignFormSelectComp, OrganizationChartModal } from "../";
import _ from "./constant";
//
//#region left nav bar & top bar white list
const WHITE_LIST = ["/document/preview", "/edms/pdfviewer", "/edms/tm/commentview"];
//#endregion

export type appwrapperProps = {
    style?: object;
    children?: React.ReactNode;
    theme?: object;
};
interface FinalappwrapperProps extends appwrapperProps {}

export const AppwrapperComponent: React.FunctionComponent<FinalappwrapperProps> = props => {
    const { path, locKey } = useLocations();
    const dispatch = useDispatch();
    const classes = useStyles(props);
    const appContext = useContext(AppContext);
    const config = useSelector((state: any) => state.fuse.settings.current.layout.config);
    const userSelector = useSelector((state: reducerState) => state.user);
    const tabSelector = useSelector((state: reducerState) => state.tab);
    const dsSelector = useSelector((state: reducerState) => state.digitalsign);
    const compSelector = useSelector((state: reducerState) => state.components);
    const projSelector = useSelector((state: reducerState) => state.project);
    const [navConfig, setNavConfig] = useState<object | null>(null);
    const [nowTab, setNowTab] = useState<string>("");
    const [signSelectVisible, setSignSelectVisible] = useState<boolean>(false);
    const [isPointerEvents, setIsPointerEvents] = useState<boolean>(false);
    const [orgChartVisible, setorgChartVisible] = useState<boolean>(false);
    const [orgChartCompany, setOrgChartCompany] = useState<string>("");
    const [orgChartElements, setOrgChartElements] = useState<any[]>([]);
    const [currentPath, setCurrentPath] = useState<string>("");

    const { routes } = appContext;
    const isFooter = [false];
    const [mainwidth, setMain] = useState<string>("100%");

    useEffect(() => {
        initEdmsData();
        // active 되어있는 menu 클릭할시 초기화
        setTimeout(() => {
            let $a: JQuery<HTMLElement> = $(".pointer-event-auto").find("a");
            $a.each((idx, a) => {
                let href: string | undefined = $(a).attr("href");
                if (typeof href == "string") {
                    $(a).on("click", onClickListItem.bind(this, href));
                }
            });
        }, 0);
    }, []);

    useEffect(() => {
        if (
            userSelector.id == null &&
            path &&
            path.indexOf("login") == -1 &&
            path.indexOf("pdfviewer") == -1 &&
            userSelector.edms_user_id == null
        ) {
            setTimeout(() => {
                window.location.href = "/login";
            }, 100);
        }
        let nav = getConstants("NAVIGATION_FOR_HDC_DOCUMENT");
        if (userSelector.id == 0 && path?.indexOf("/edms/home") == -1) {
            window.location.href = "/edms/home";
        }
        if (
            userSelector.id &&
            window.localStorage.getItem("access_token") != "" &&
            (path == undefined || path.indexOf("/edms") == -1)
        ) {
            dispatch(GetSignFormList());
            dispatch(GetAddressbook());
            dispatch(GetSignFormDetailList());
            dispatch(GetNormalDocumentUserList());
            if (nav != navConfig) {
                dispatch(setNavigation(nav != null ? nav : []));
                setNavConfig(nav);
            }
        } else {
            dispatch(setNavigation([]));
        }
        dispatch(GetGeneralCode());
    }, [userSelector.id]);

    useEffect(() => {
        if (projSelector.project_type_list && projSelector.project_type_list.length > 0) {
            dispatch(SetNowProject(projSelector.project_type_list[0].p_project_no));
        }
    }, [projSelector.project_type_list]);

    useEffect(() => {
        if (dsSelector.organization_chart) {
            let company_list: any[] = [];
            let nav_list = [];
            for (var org of dsSelector.organization_chart) {
                if (company_list.indexOf(org.company) != -1) continue;
                company_list.push(org.company);
                nav_list.push({
                    id: org.company,
                    title: org.company,
                    type: "item",
                    url: "/" + org.company,
                });
            }
            dispatch(
                updateNavigationItem("organization", {
                    children: [...nav_list],
                })
            );

            setTimeout(() => {
                let _a = document.getElementsByTagName("a");
                for (var a of _a) {
                    if (a.children.length == 0 || a.children[0] == undefined) continue;
                    if (company_list.indexOf(a.children[0].textContent) != -1) {
                        a.onclick = (e: any) => {
                            e.preventDefault();
                            setorgChartVisible(true);
                            setOrgChartCompany(e.target.innerText);
                        };
                        a.removeAttribute("href");
                        orgChartElements.push(a);
                    }
                }
                setOrgChartElements(orgChartElements);
            }, 500);
        }
    }, [dsSelector.organization_chart]);

    useEffect(() => {
        if (tabSelector.type != "" && tabSelector.type != nowTab) {
            setNowTab(tabSelector.type);
            let nav = getConstants(
                tabSelector.type == "document"
                    ? userSelector.admin_level == 1
                        ? "NAVIGATION_FOR_HDC_DOCUMENT"
                        : "NAVIGATION_FOR_HDC"
                    : "NAVIGATION_FOR_HDC_EDMS"
            );
            if (nav != navConfig && path?.indexOf("edms") != -1) {
                initEdmsData();
                if (userSelector.is_menu1) {
                    nav.push(_.EDMS_PROJECT_TREND);
                    nav.push(_.EDMS_DOCUMENT_MANAGE_NAV);
                }
                if (userSelector.is_menu2) {
                    // nav.push(EDMS_WORK_ACHIEVE_NAV);
                    projSelector.project_type_list.map((raw: any, idx: number) => {
                        let children = [
                            {
                                id: raw.project_name + "dcl",
                                title: "DCL",
                                sub: raw.project_name + " - DCL",
                                type: "item",
                                url: "/edms/dcl/" + raw.project_no,
                            },
                            {
                                id: raw.project_name + "vp",
                                title: "V/P",
                                sub: raw.project_name + " - V/P",
                                type: "item",
                                url: "/edms/vp/" + raw.project_no,
                            },
                        ];
                        if (raw.project_name == "발전소") {
                            children.push({
                                id: raw.project_name + "plantlog",
                                title: "주기기",
                                sub: raw.project_name + " - 주기기",
                                type: "item",
                                url: "/edms/plantlog/" + raw.project_no,
                            });
                        }

                        nav.push({
                            id: raw.project_name,
                            title: raw.project_name,
                            type: "group",
                            children: children,
                        });
                    });
                    nav.push(_.EDMS_OTHER_DOC);
                    // if (userSelector.company == 4) {
                    //     nav.push(_.EDMS_TFT_LOG);
                    // }
                }
                if (userSelector.admin_level == 1) {
                    nav.push(_.EDMS_DOCUMENT_INFO_NAV);
                }
            }
            dispatch(setNavigation(nav != null ? nav : []));
            setNavConfig(nav);
        }
    }, [tabSelector.type]);

    useEffect(() => {
        if (path) {
            setorgChartVisible(false);
            // dispatch(Handshake());
            if (path && path.indexOf("login") == -1 && path.indexOf("regist") == -1) {
                // 최근에 방문했던 페이지를 기본으로 설정.
                const pastPath = window.localStorage.getItem("hdc_past_path");
                if (!/^\/edms/.test(path)) {
                    setIsPointerEvents(true);
                } else {
                    setIsPointerEvents(false);
                }
                if (
                    path != "/" &&
                    _.PAST_PATH_BLACK_LIST.find(raw => path.indexOf(raw) != -1) == undefined
                )
                    window.localStorage.setItem("hdc_past_path", path);
                //
                if (userSelector.id == null && userSelector.edms_user_id == null) {
                    location.href = "/login";
                } else if (path == "/") {
                    // 아무런 파라미터가 없을경우, 최근 주소가 있다면 최근 주소로 이동
                    // if (pastPath) {
                    //     location.href = pastPath;
                    // } else {
                    location.href = "/dshome";
                    // }
                }
            }
            dispatch(GetStageCodes());
            dispatch(GetAddressbook());
            setCurrentPath(path);
        }
    }, [path]);

    useEffect(() => {
        setSignSelectVisible(compSelector.isOpenSignSelect);
    }, [compSelector.isOpenSignSelect]);

    useEffect(() => {
        if (orgChartVisible) {
            setMain("75%");
        } else {
            setMain("100%");
            orgChartElements.map((raw: any, idx: number) => raw.classList.remove("active"));
        }
    }, [orgChartVisible]);

    useEffect(() => {
        if (orgChartElements.length > 0) {
            let _res = orgChartElements.filter(
                (raw: any, idx: number) => raw.innerText == orgChartCompany
            );
            if (_res.length > 0) {
                orgChartElements.map((raw: any, idx: number) => raw.classList.remove("active"));
                _res[0].classList.add("active");
            }
        }
    }, [orgChartCompany]);
    //
    const initEdmsData = () => {
        if (path?.indexOf("edms") != -1) {
            dispatch(GetAllList());
            if (userSelector.edms_level == 1) {
                dispatch(GetIndexData());
            }
        }
        if (userSelector.edms_user_id) dispatch(GetEdmsAddress());
    };

    const onCloseSignSelect = () => {
        dispatch(ChangeSignSelectModal());
    };

    const onCloseOrgChart = () => {
        setorgChartVisible(false);
    };

    const checkWhiteList = () => {
        if (path && WHITE_LIST.find(raw => path.indexOf(raw) != -1)) return true;
        return false;
    };

    const onClickListItem = (href: string) => {
        if (location.pathname == href) {
            location.reload();
        }
    };
    if (checkWhiteList())
        return <div style={{ overflow: "auto", width: "100%" }}>{props.children}</div>;

    return (
        <div
            id="fuse-layout"
            className={clsx(classes.root, config.mode, `scroll-${config.scroll}`)}
            style={props.style}
        >
            {/* <CountPingComp /> */}
            <SignFormSelectComp visible={signSelectVisible} onClose={onCloseSignSelect} />
            <LoadingIndicatorComponent open={dsSelector.isLoading} style={{ zIndex: 10 }} />
            {config.leftSidePanel.display && <Leftside />}
            <div
                className="flex flex-1 flex-col overflow-hidden relative"
                style={{ justifyContent: "center", alignItems: "center" }}
            >
                {config.toolbar.display && config.toolbar.position === "above" && (
                    <Toolbar className="top-toolbar" />
                )}
                <div className={classes.wrapper}>
                    {config.navbar.display && config.navbar.position === "left" && (
                        <NavbarWrapper
                            pointerEvents={isPointerEvents}
                            navBarClassName="nav-appbar"
                            path={path}
                        />
                    )}
                    <div
                        className={classes.contentWrapper}
                        style={{ justifyContent: "center", alignItems: "center" }}
                    >
                        {config.toolbar.display &&
                            config.toolbar.position === "below" &&
                            config.toolbar.style === "fixed" && <Toolbar className="top-toolbar" />}

                        <FuseScrollbars
                            className={classes.content}
                            scrollToTopOnRouteChange
                            style={{ justifyContent: "center", alignItems: "center" }}
                        >
                            {config.toolbar.display &&
                                config.toolbar.position === "below" &&
                                config.toolbar.style !== "fixed" && (
                                    <Toolbar className="top-toolbar" />
                                )}

                            <FuseDialog />
                            <FuseSuspense>{renderRoutes(routes)}</FuseSuspense>
                            <div
                                style={{
                                    height: "100%",
                                    width: path?.indexOf("login") != -1 ? "100%" : "98%",
                                    overflow: "hidden",
                                    padding: "10px 0",
                                }}
                            >
                                <TransitionGroup
                                    style={{
                                        width: mainwidth,
                                        height: "100%",
                                        float: "left",
                                        overflow: "auto",
                                    }}
                                >
                                    {props.children}
                                </TransitionGroup>
                                <Slide direction="left" in={orgChartVisible}>
                                    <TransitionGroup
                                        style={{
                                            width: "25%",
                                            height: "100%",
                                            float: "left",
                                            position: "relative",
                                        }}
                                    >
                                        <CSSTransition
                                            key={locKey}
                                            timeout={1000}
                                            classNames="slide"
                                            style={{ width: "80%" }}
                                        >
                                            <OrganizationChartModal
                                                company={orgChartCompany}
                                                visible={true}
                                                onClose={onCloseOrgChart}
                                            />
                                        </CSSTransition>
                                    </TransitionGroup>
                                </Slide>
                            </div>
                            {config.footer.display &&
                                config.footer.position === "below" &&
                                config.footer.style !== "fixed" && <Footer isVisible={isFooter} />}
                        </FuseScrollbars>
                        {config.footer.display &&
                            config.footer.position === "below" &&
                            config.footer.style === "fixed" && <Footer isVisible={isFooter} />}

                        {/* <SettingsPanel />/ */}
                    </div>
                    {config.navbar.display && config.navbar.position === "right" && (
                        <NavbarWrapper navBarClassName="nav-appbar" />
                    )}
                </div>
                {config.footer.display && config.footer.position === "above" && (
                    <Footer isVisible={isFooter} />
                )}
            </div>
            {config.rightSidePanel.display && <Rightside />}
            {/* <FuseMessage /> */}
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        "&.boxed": {
            maxWidth: 1280,
            margin: "0 auto",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
        "&.scroll-body": {
            "& $wrapper": {
                height: "auto",
                flex: "0 0 auto",
                overflow: "auto",
            },
            "& $contentWrapper": {},
            "& $content": {},
        },
        "&.scroll-content": {
            "& $wrapper": {},
            "& $contentWrapper": {},
            "& $content": {},
        },
        "& .navigation": {
            "& .list-subheader-text, & .list-item-text, & .item-badge, & .arrow-icon": {
                transition: theme.transitions.create("opacity", {
                    duration: theme.transitions.duration.shortest,
                    easing: theme.transitions.easing.easeInOut,
                }),
            },
        },
    },
    wrapper: {
        display: "flex",
        position: "relative",
        width: "100%",
        height: "100%",
        flex: "1 1 auto",
    },
    contentWrapper: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        zIndex: 3,
        overflow: "hidden",
        flex: "1 1 auto",
        backgroundColor: "#E5E5E5",
    },
    content: {
        position: "relative",
        display: "flex",
        overflow: "auto",
        flex: "1 1 auto",
        flexDirection: "column",
        width: "100%",
        "-webkit-overflow-scrolling": "touch",
        zIndex: 2,
        alignItems: "center",
    },
}));
