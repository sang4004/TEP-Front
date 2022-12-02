import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import NotificationsNoneOutlined from "@material-ui/icons/NotificationsNoneOutlined";
import {
    ChangeSignSelectModal,
    GetNewGeneralDoc,
    ChangeTab,
    ChangeTabHistoryEdms,
    ChangeTabHistoryDoc,
    GetProjectTypeList,
} from "../../common/action";
import { EdmsAlarmModal } from "../../components";
import { useAsyncEffect, useLocations } from "hooks";
import { getConstants } from "utils_ts/lib";

const useStyles = makeStyles(theme => ({
    root: {
        height: "fit-content",
        maxHeight: "25%",
        "&.user": {
            "& .username, & .email": {
                transition: theme.transitions.create("opacity", {
                    duration: theme.transitions.duration.shortest,
                    easing: theme.transitions.easing.easeInOut,
                }),
            },
        },
    },
    avatar: {
        width: 52,
        height: 52,
        padding: 8,
        boxSizing: "content-box",
        "& > img": {
            borderRadius: "50%",
        },
    },
}));

function UserNavbarHeader(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const tabSelector = useSelector(state => state.tab);
    const edmsUserCheck = useSelector(state => state.authority);
    const pingSelector = useSelector(state => state.ping);

    const { path, pushHistory } = useLocations();
    const [nowTab, setNowTab] = useState("");
    const nav_doc = JSON.stringify(getConstants("NAVIGATION_FOR_HDC_DOCUMENT")).toString();
    const nav_edms = JSON.stringify(getConstants("NAVIGATION_FOR_HDC_EDMS")).toString();
    const history = useHistory();
    const classes = useStyles();

    const [nowHistory, setNowHistory] = useState("");
    const [alarmModalVisible, setAlarmModalVisible] = useState(false);
    const [bgColor, setBGColor] = useState(false);

    // 읽지 않은 업무절차가 있으면 : true
    // 읽지 않은 업무절차가 없으면 : false
    useEffect(() => {
        if (pingSelector.recv_box_count != 0) {
            setBGColor(true);
        } else {
            setBGColor(false);
        }
    }, [pingSelector.recv_box_count]);

    const onClickLogin = () => {
        history.push("/login");
    };

    const onClickNewSign = () => {
        if (history.location.pathname.localeCompare("/document/new") == 0) return;
        dispatch(ChangeSignSelectModal());
    };

    const onClickNewDocument = async () => {
        if (history.location.pathname.localeCompare("/document/normal/write") == 0) return;
        // await dispatch(NewGeneralDoc());
        await dispatch(GetNewGeneralDoc());
        setTimeout(() => {
            // 일반문서 작성페이지로 이동
            history.push("/document/normal/write");
        }, 500);
    };

    const handleChangeTab = async (event, newVal) => {
        if (newVal != undefined) {
            let goPath = "";
            if (newVal == 1 && user.edms_user_id) {
                goPath = tabSelector.edms_path != "" ? tabSelector.edms_path : "/edms/home";
                setNowTab("edms");
            } else if (newVal == 1 && !user.edms_user_id) {
                alert("접근 권한이 없습니다. 관리자에게 문의해주세요.");
            } else {
                goPath = tabSelector.doc_path != "" ? tabSelector.doc_path : "/dshome";
                setNowTab("document");
            }
            if (goPath != path) pushHistory(goPath);
        }
    };

    const onClickAlarm = () => {
        setAlarmModalVisible(true);
    };

    const onCloseModal = () => {
        setAlarmModalVisible(false);
    };

    useAsyncEffect(async () => {
        if (path) {
            setNowHistory(path);
            let isDocURL = nav_doc.includes(path) || path.includes("document") ? 1 : 0;
            let isEdmsURL = nav_edms.includes(path) || path.includes("edms") ? 1 : 0;
            if (isEdmsURL) {
                dispatch(ChangeTabHistoryEdms(path));
                await dispatch(GetProjectTypeList());
                await dispatch(ChangeTab("edms"));
                setNowTab("edms");
            } else if (isDocURL) {
                dispatch(ChangeTabHistoryDoc(path));
                await dispatch(ChangeTab("document"));
                setNowTab("document");
            }
        }
    }, [path]);
    return (
        <AppBarWrap
            position="static"
            color="primary"
            classes={{ root: classes.root }}
            className="user relative flex flex-col items-center justify-center z-0 shadow-0 h-25"
        >
            <EdmsAlarmModal visible={alarmModalVisible} onClose={onCloseModal} />
            {user.id || user.edms_user_id ? (
                <>
                    <InfoGroup>
                        <TextGroup>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <NameText className="whitespace-nowrap" color="inherit">
                                    {user.username}
                                </NameText>
                                {tabSelector.type === "edms" && (
                                    <Alarm onClick={onClickAlarm} $color={bgColor}>
                                        <NotificationsNoneOutlined />
                                    </Alarm>
                                )}
                            </div>
                            <PartText>{user.groupname}</PartText>
                            <EmailText className="whitespace-nowrap" color="inherit">
                                {user.email}
                            </EmailText>
                        </TextGroup>
                    </InfoGroup>
                </>
            ) : (
                <LoginBtn variant="contained" onClick={onClickLogin}>
                    로그인
                </LoginBtn>
            )}
            {user.id != null && (
                <TabsBlock
                    style={{}}
                    value={nowTab == "document" ? 0 : 1}
                    onChange={handleChangeTab}
                    TabIndicatorProps={{ style: { display: "none" } }}
                >
                    <TabBlock
                        value={0}
                        label="문서수발신시스템"
                        $isTab={nowTab == "document"}
                        $dir="left"
                    />
                    <TabBlock value={1} label="EDMS" $isTab={nowTab == "edms"} $dir="right" />
                </TabsBlock>
            )}
            <TabBtmBlock />
            {tabSelector.type != "edms" && (
                <DocumentBtnBlock>
                    <SignatureBtn
                        $selected={nowHistory.localeCompare("/document/new") == 0}
                        onClick={onClickNewSign}
                    >
                        공문서작성
                    </SignatureBtn>
                    <SignatureBtn
                        $selected={nowHistory.localeCompare("/document/normal/write") == 0}
                        onClick={onClickNewDocument}
                    >
                        일반문서작성
                    </SignatureBtn>
                </DocumentBtnBlock>
            )}
        </AppBarWrap>
    );
}

const DocumentBtnBlock = styled.div`
    padding: 10px 0;
    width: 100%;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
    background-color: white;
`;

const SignatureBtn = styled(Button)`
    color: white;
    flex: 1;
    font-size: 16px;
    border-radius: 0;
    background-color: ${props => (props.$selected ? `#2651A8` : `#599AE5`)};
    &:hover {
        background-color: ${props => (props.$selected ? `#2651A8` : `#599AE5`)};
    }
`;

const TabsBlock = styled(Tabs)`
    min-height: 42px;
    width: 100%;
    background-color: white;
`;

const TabBtmBlock = styled.div`
    width: 100%;
    height: 17px;
    background-color: white;
    box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.4);
`;

const TabBlock = styled(Tab)`
    &:hover {
        background-color: none;
    }
    background-color: ${props => (props.$isTab ? "white" : "#f7f8f8")};
    color: ${props => (props.$isTab ? "#477EE9" : "#7094DB")};
    font-weight: ${props => (props.$isTab ? 700 : 800)};
    width: 50%;
    min-width: fit-content;
    margin-top: 1px;
    ${props =>
        props.$isTab
            ? props.$dir == "left"
                ? `
		box-shadow: 2px 0 3px rgba(0, 0, 0, 0.3);
		border-radius: 5px 5px 0px 0px;
	`
                : `
		box-shadow: -2px 0 3px rgba(0, 0, 0, 0.3);
		border-radius: 5px 5px 0px 0px;
	`
            : ``}
`;

const LoginBtn = styled(Button)`
    margin: 10px 0;
    background-color: #477ee9;
    color: white;
`;

const AppBarWrap = styled(AppBar)`
    background-color: #f7f8f8;
`;

const InfoGroup = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 8em;
    padding: 10px 10px;
`;

const TextGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 0 10px;
`;

const NameText = styled(Typography)`
    padding: 0.1em;
    color: #292929;
    font-size: 1.2em;
    letter-spacing: 6px;
`;

const PartText = styled(Typography)`
    padding: 0.1em;
    color: #292929;
    font-size: 1em;
    white-space: break-spaces;
`;

const EmailText = styled(Typography)`
    padding: 0.1em;
    color: #292929;
    font-weight: 600;
`;

const Alarm = styled.div`
    background-color: ${props => (props.$color ? "#F44236" : "#477EE9")};
    border-radius: 30px;
    &:hover {
        cursor: pointer;
    }
`;

export default UserNavbarHeader;
