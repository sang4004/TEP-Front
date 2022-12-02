import React, { useState, useCallback } from "react";

export const useElementPosition = () => {
    const [position, setPosition] = useState<any>({
        left: undefined,
        right: undefined,
        top: undefined,
        bottom: undefined,
    });

    const ref = useCallback((node: Element) => {
        if (node !== null) {
            setPosition({
                top: node.getBoundingClientRect().top,
                bottom: node.getBoundingClientRect().bottom,
                left: node.getBoundingClientRect().left,
                right: node.getBoundingClientRect().right,
            });
        }
    }, []);

    return [position, ref];
};
