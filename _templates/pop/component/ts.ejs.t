---
to: packages/pop-fe/src/components/<%=name%>/index.tsx
---
/******************************************************************************
 * <%=name%>/index.tsx
 * hooks :
    * useLocations 
    *
 * last modify : 
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import { useState, useEffect } from "react"; // default hooks
import styled from "styled-components";
//
// Module
import "./index.css";
import { useLocations } from "hooks" // locations hooks
//

export type <%=name%>Props = {
    style : object   
}
interface Final<%=name%>Props extends <%=name%>Props {};

export const <%=name.split("")[0].toUpperCase() + name.split("").splice(1, name.split("").length-1 ).join("") %>Component : React.FunctionComponent<Final<%=name%>Props> = ( props )=>{
    const { back, existBack, path } = useLocations();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    useEffect(()=>{
        // initialize here
    }, []);

    return (
        <<%=name.split("")[0].toUpperCase() + name.split("").splice(1, name.split("").length-1 ).join("") %>Container 
            style={props.style}
            className="<%=name%>"
            >
            <%=name%>
        </<%=name.split("")[0].toUpperCase() + name.split("").splice(1, name.split("").length-1 ).join("") %>Container>
    );
}

const <%=name.split("")[0].toUpperCase() + name.split("").splice(1, name.split("").length-1 ).join("") %>Container = styled.div`
    width : 100%;
    height : 100%;
    margin : 0;
    padding : 0;
`;