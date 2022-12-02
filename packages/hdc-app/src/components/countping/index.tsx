import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux"; // redux
import { reducerState } from "../../common";
import { GetCountPing, GetCountPingEdms } from "../../common/action";
import { FetchApiGet } from "../../common/network";
import { useLocations, useInterval } from "hooks";
import {
    setNavigation,
    selectNavigation,
    updateNavigationItem,
} from "fuse_app/lib/store/fuse/navigationSlice";

export type CountPingCompProps = {
    path?: any;
};

interface FinalCountPingCompProps extends CountPingCompProps {}

// export const CountPingComp = () => {
export const CountPingComp: React.FunctionComponent<FinalCountPingCompProps> = props => {
    const dispatch = useDispatch();
    const userSelector = useSelector((state: reducerState) => state.user);
    const pingSelector = useSelector((state: reducerState) => state.ping);
    const projSelector = useSelector((state: reducerState) => state.project);
    const tabSelector = useSelector((state: reducerState) => state.tab);
    const navigation = useSelector(selectNavigation);

    // count ping
    // if (process.env && process.env.NODE_ENV !== "development") {
    useEffect(() => {
        if (props.path?.indexOf("edms") == -1) {
            dispatch(GetCountPing());
            const interval = setInterval(() => {
                if (userSelector.id) dispatch(GetCountPing());
            }, 30 * 1000);
            return () => clearInterval(interval);
        }
    }, [props.path]);
    // }

    useEffect(() => {
        if (props.path?.indexOf("edms") != -1) {
            let interval: any;
            if (userSelector.edms_user_id) {
                dispatch(GetCountPingEdms());
                interval = setInterval(() => {
                    dispatch(GetCountPingEdms());
                }, 30 * 1000);
            }
            return () => clearInterval(interval);
        }
    }, [props.path]);

    useEffect(() => {
        if (tabSelector.type == "document") {
            dispatch(GetCountPing());
        } else {
            dispatch(GetCountPingEdms());
        }
    }, [tabSelector.type]);

    useEffect(() => {
        if (tabSelector.type == "document") {
            process.nextTick(CountPingCB);
        } else {
            process.nextTick(CountPingEdmsCB);
        }
    }, [pingSelector.time]);

    const getCount = (id: string) => {
        let count: number = 0;
        if (navigation.length > 0) {
            let exit = false;
            navigation.map((nav: any) => {
                if (exit) return;
                if (nav.children) {
                    let target: any = nav.children.find((child: any) => {
                        return child.id == id;
                    });
                    if (target && target.badge != undefined) {
                        count = target.badge.title;
                        exit = true;
                    }
                }
            });
        }
        return count;
    };
    const updateCountPingItem = (type: string, count: number, option?: object) => {
        dispatch(
            updateNavigationItem(type, {
                badge: {
                    title: count,
                    ...option,
                },
            })
        );
    };

    const CountPingCB = () => {
        if (props.path?.indexOf("edms") == -1) {
            //filetemporary
            let filetemporaryCount: number =
                pingSelector.doc_temp_count + pingSelector.general_doc_temp_count;
            if (getCount("filetemporary") != filetemporaryCount) {
                updateCountPingItem("filetemporary", filetemporaryCount);
            }

            //wait
            let waitCount: number =
                pingSelector.doc_signing_count + pingSelector.general_doc_signing_count;
            let singingBadgeObj = {};
            if (pingSelector.doc_signing_is_approval && pingSelector.doc_signing_is_approval > 0)
                Object.assign(singingBadgeObj, { bg: "rgb(244,66,54)" });
            else Object.assign(singingBadgeObj, { bg: "rgb(3, 155, 228)" });

            if (getCount("wait") != waitCount) {
                updateCountPingItem("wait", waitCount, singingBadgeObj);
            }

            //reject
            let rejectCount: number =
                pingSelector.doc_reject_count + pingSelector.general_doc_reject_count;
            let rejectBadgeObj = {};
            if (pingSelector.doc_reject_is_re_request && pingSelector.doc_reject_is_re_request > 0)
                Object.assign(rejectBadgeObj, { bg: "rgb(244,66,54)" });
            else Object.assign(rejectBadgeObj, { bg: "rgb(3, 155, 228)" });
            if (getCount("reject") != rejectCount) {
                updateCountPingItem("reject", rejectCount, rejectBadgeObj);
            }

            //complete
            let completeCount: number =
                pingSelector.doc_complete_count + pingSelector.general_doc_complete_count;
            let completeBadgeObj = {};
            if (pingSelector.doc_complete_is_send && pingSelector.doc_complete_is_send > 0)
                Object.assign(completeBadgeObj, { bg: "rgb(244, 66, 54)" });
            else Object.assign(completeBadgeObj, { bg: "rgb(3, 155, 228)" });

            if (getCount("complete") != completeCount) {
                updateCountPingItem("complete", completeCount, completeBadgeObj);
            }

            //filesent
            if (getCount("filesent") != pingSelector.doc_sent_count) {
                updateCountPingItem("filesent", pingSelector.doc_sent_count);
            }

            //filerecieve
            let recvBadgeObj = {};
            if (pingSelector.doc_recv_is_read && pingSelector.doc_recv_is_read > 0)
                Object.assign(recvBadgeObj, { bg: "rgb(244, 66, 54)" });
            else Object.assign(recvBadgeObj, { bg: "rgb(3, 155, 228)" });

            if (getCount("filerecieve") != pingSelector.doc_recv_count) {
                updateCountPingItem("filerecieve", pingSelector.doc_recv_count, recvBadgeObj);
            }

            //groupfilesent
            if (getCount("groupfilesent") != pingSelector.doc_group_sent_count) {
                updateCountPingItem("groupfilesent", pingSelector.doc_group_sent_count);
            }

            //groupfilerecieve
            if (getCount("groupfilerecieve") != pingSelector.doc_group_recv_count) {
                updateCountPingItem("groupfilerecieve", pingSelector.doc_group_recv_count);
            }

            //generaldocsend
            if (getCount("generaldocsend") != pingSelector.doc_general_send_count) {
                updateCountPingItem("generaldocsend", pingSelector.doc_general_send_count);
            }

            //generaldocrecv
            let grecvBadgeObj = {};
            if (pingSelector.doc_general_recv_is_read && pingSelector.doc_general_recv_is_read > 0)
                Object.assign(grecvBadgeObj, { bg: "rgb(244, 66, 54)" });
            else Object.assign(grecvBadgeObj, { bg: "rgb(3, 155, 228)" });

            if (getCount("generaldocrecv") != pingSelector.doc_general_recv_count) {
                updateCountPingItem(
                    "generaldocrecv",
                    pingSelector.doc_general_recv_count,
                    grecvBadgeObj
                );
            }
            //groupgeneraldocsend
            if (getCount("groupgeneraldocsend") != pingSelector.doc_group_general_send_count) {
                updateCountPingItem(
                    "groupgeneraldocsend",
                    pingSelector.doc_group_general_send_count
                );
            }
            //groupgeneraldocrecv
            if (getCount("groupgeneraldocrecv") != pingSelector.doc_group_general_recv_count) {
                updateCountPingItem(
                    "groupgeneraldocrecv",
                    pingSelector.doc_group_general_recv_count
                );
            }
        }
    };

    const CountPingEdmsCB = () => {
        if (props.path?.indexOf("edms") != -1) {
            let dinBadgeObj = {};
            Object.assign(dinBadgeObj, { bg: "rgb(3, 155, 228)" });
            if (getCount("drn") != pingSelector.drn_count) {
                dispatch(
                    updateNavigationItem("drn", {
                        badge: { title: pingSelector.drn_count, fg: "#FFFFFF", ...dinBadgeObj },
                    })
                );
            }
            if (getCount("tm") != pingSelector.tm_count) {
                dispatch(
                    updateNavigationItem("tm", {
                        badge: { title: pingSelector.tm_count, fg: "#FFFFFF", ...dinBadgeObj },
                    })
                );
            }
        }
    };

    return <></>;
};
