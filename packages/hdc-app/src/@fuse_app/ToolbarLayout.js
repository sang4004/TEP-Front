import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import NavbarMobileToggleButton from "fuse_app/lib/fuse-layouts/shared-components/NavbarMobileToggleButton";
import { selectToolbarTheme } from "fuse_app/lib/store/fuse/settingsSlice";
import UserMenu from "./UserMenu";
import { useLocations } from "hooks";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import EmailIcon from "@material-ui/icons/Email";

import { selectNavigation } from "fuse_app/lib/store/fuse/navigationSlice";
import settingIconSvg from "../images/icon/setting_icon.svg";
import { GetProjectTypeList, SetNowProject, GetTmCodeList } from "../common/action";
import Email from "@material-ui/icons/Email";

const useStyles = makeStyles(theme => ({
    root: {},
    input: {
        "&::placeholder": {
            color: "#313131",
        },
    },
}));

function ToolbarLayout1(props) {
    const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
    const dispatch = useDispatch();
    const userSelector = useSelector(state => state.user);
    const projSelector = useSelector(state => state.project);
    const tabSelector = useSelector(state => state.tab);
    const toolbarTheme = useSelector(selectToolbarTheme);
    const tmSelector = useSelector(state => state.tm);

    const classes = useStyles(props);
    const { path, pushHistory } = useLocations();
    const navigation = useSelector(selectNavigation);
    const [nowTitle, setNowTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");

    const [isEdmsMain, setIsEdmsMain] = useState(false);
    const [projectList, setProjectList] = useState([]);
    const [projId, setProjId] = useState(-1);
    const [trManager, setTrManager] = useState(false);

    useEffect(() => {
        dispatch(GetProjectTypeList());
        dispatch(GetTmCodeList());
    }, []);

    useEffect(() => {
        if (tmSelector.tm_code_list && tmSelector.tm_code_list.length > 0) {
            let tm_user = tmSelector.tm_code_list.find(
                raw => raw.tm_user_id == userSelector.edms_user_id
            );
            if (tm_user != undefined) {
                setTrManager(true);
            }
        }
    }, [tmSelector.tm_code_list]);

    useEffect(() => {
        if (projSelector.project_list && projSelector.project_list.length > 0) {
            setProjectList(projSelector.project_list);
            dispatch(SetNowProject(projSelector.project_list[0].project_no));
        }
    }, [projSelector.project_list]);

    useEffect(() => {
        if (projectList.length > 0 && projId == -1) {
            let filtered = projectList[0];
            setProjId(filtered.project_no);
        }
    }, [projectList]);

    useEffect(() => {
        if (projSelector.now_project_no) setProjId(projSelector.now_project_no);
    }, [projSelector.now_project_no]);

    const onChange = e => {
        let _id = e.target.value;
        dispatch(SetNowProject(_id));
    };

    useEffect(() => {
        if (navigation) {
            let _nav = null;
            for (var nav of navigation) {
                if (nav.url && nav.url.localeCompare(path) == 0) _nav = nav;
                else if (nav.children) {
                    for (var child of nav.children) {
                        if (child.url && child.url.localeCompare(path) == 0) {
                            _nav = child;
                            break;
                        }
                    }
                }
                if (_nav != null) break;
            }
            if (_nav && _nav != null) {
                setNowTitle(_nav.title);
                setIsEdmsMain(false);
                if (path.indexOf("edms/home") != -1) setIsEdmsMain(true);
                if (path.indexOf("edms") != -1) {
                    let title = _nav.sub;
                    setNowTitle(title);
                }
            } else if (_nav == null) {
                if (path) {
                    if (path.indexOf("normal/write") != -1) {
                        setNowTitle("작성 중");
                    } else if (path.indexOf("normal/view") != -1) {
                        setNowTitle("일반문서");
                    }
                }
                setIsEdmsMain(false);
            }
        }
    }, [path, navigation]);

    useEffect(() => {
        if (tabSelector.edms_nav_title.length > 0) {
            let title = tabSelector.edms_nav_title;
            setNowTitle(title);
        }
    }, [tabSelector.edms_nav_title]);

    return (
        <ThemeProvider theme={toolbarTheme}>
            <AppBarWrap
                id="fuse-toolbar"
                className={clsx(classes.root, "flex relative z-10 shadow-md ", props.className)}
                color="default"
                // style={{ backgroundColor: toolbarTheme.palette.background.paper }}
            >
                <ToolbarWrap className="flex p-0 min-h-48 h-full">
                    <Hidden lgUp>
                        <NavbarMobileToggleButton />
                    </Hidden>
                    <ToolbarTopDiv
                        className="flex items-center"
                        $borderNone={path && path.localeCompare("/login") == 0}
                    >
                        {!isEdmsMain && (
                            <TopPathText>
                                {nowTitle}
                                <span>{subTitle}</span>
                            </TopPathText>
                        )}
                        {/* {isEdmsMain && 
							<ProjectTitle>
								<ProjectSelect disableUnderline value={projId} onChange={onChange}>
									{projectList.map((raw, idx) => {
										return (
											<ProjectSelectMenu value={raw.project_no}>
												{raw.project_name}
											</ProjectSelectMenu>
										);
									})}
								</ProjectSelect>
							</ProjectTitle>
						} */}
                        <TopToolGroup>
                            {/* <Searchbar>
								<SearchField 
									InputProps={{
										disableUnderline : true,
										classes : { input : classes.input}
									}}
									placeholder={"검색"}
									/>
								<SearchIcon src={searchIconSvg} />
							</Searchbar> */}
                            {trManager && (
                                <ToolBtn onClick={() => pushHistory("/edms/mail")}>
                                    <Email fontSize="medium" />
                                </ToolBtn>
                            )}
                            <ToolBtn>
                                <ToolBtnImg
                                    onClick={() => pushHistory("/userinfo/" + userSelector.id)}
                                    src={settingIconSvg}
                                />
                            </ToolBtn>
                            {/* <ToolBtn>
								<ToolBtnImg src={alarmIconSvg} />
							</ToolBtn> */}
                            <UserMenu />
                        </TopToolGroup>
                    </ToolbarTopDiv>
                </ToolbarWrap>
            </AppBarWrap>
        </ThemeProvider>
    );
}

const ProjectTitle = styled.div`
    display: flex;
    flex-direction: column;
    width: 20%;
`;

const ProjectSelect = styled(Select)`
    border: none;
    outline: none;
    font-size: 1.6em;
    color: black;
`;

const ProjectSelectMenu = styled(MenuItem)``;

const AppBarWrap = styled(AppBar)`
    box-shadow: none;
`;

const ToolbarWrap = styled(Toolbar)`
    justify-content: center;
`;

const ToolbarTopDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 97%;
    height: 100%;
    margin-top: 10px;
    /* border-bottom : ${props => (props.$borderNone ? "none" : "1px solid #cccccc")}; */
`;

const TopPathText = styled.div`
    font-size: 22px;
    color: #333333;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 2;
    height: 100%;
    font-weight: 600;
    span {
        font-size: 14px;
        color: #999999;
        margin: 5px 0 0 15px;
    }
`;

const TopToolGroup = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    padding-right: 10px;
    align-items: center;
    flex-direction: row;
    height: 100%;
`;

const Searchbar = styled.div`
    background-color: #fff;
    border-radius: 15px;
    -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.16);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.16);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 55%;
    gap: 10px;
`;

const SearchField = styled(TextField)`
    flex: 1;
    margin: 0 8px 0 16px;
`;

const SearchIcon = styled.img`
    width: 18px;
    height: auto;
    margin: 0 16px 0 8px;
    cursor: pointer;
`;

const ToolBtn = styled(Button)`
    width: 40px;
    height: 40px;
    min-width: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-left: 10px;
`;

const ToolBtnImg = styled(Avatar)`
    width: 60%;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default React.memo(ToolbarLayout1);
