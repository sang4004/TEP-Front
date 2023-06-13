import React, { useEffect, useState, useMemo } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

type useLocationType = {
    path?: string;
    existBack: boolean;
    back: Function;
    pushHistory: Function;
    searchParam: URLSearchParams;
    locKey?: string;
};

export const useLocations = (): useLocationType => {
    const history = useHistory();
    const { pathname, search, state, key } = useLocation();
    const existBack = useMemo(() => (state ? true : false), [state]);
    const searchParam = useMemo(() => new URLSearchParams(search), [search]);

    const pushHistory = (path: string) => {
        history.push(path, { from: pathname });
    };

    const back = () => {
        if (existBack) return history.goBack();
    };

    return {
        path : pathname,
        existBack,
        back,
        pushHistory,
        searchParam,
        locKey : key,
    };
};
