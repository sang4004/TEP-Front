import React, { useRef, useEffect } from "react";
import styled from "styled-components";

function useOutsideAlerter(ref : React.RefObject<HTMLDivElement>, cb : Function) {
    useEffect(() => {
        function handleClickOutside(this : Document, ev : MouseEvent) {
            if (ref && ref  && ref.current && ev.target && !ref.current.contains(ev.target as Node)) {
                cb();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

type useOutsideClickProps = {
    children : React.ReactNode;
    onClickOutside : ()=>void;
}

export const useOutsideClick : React.FunctionComponent<useOutsideClickProps> = (props : useOutsideClickProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    useOutsideAlerter(wrapperRef, props.onClickOutside);

    return <OutsideDiv ref={wrapperRef}>{props.children}</OutsideDiv>;
}

const OutsideDiv = styled.div`
    display : flex;
    justify-content : flex-end;
    align-items : center;
    width : 100%;
    height : 100%;
`;