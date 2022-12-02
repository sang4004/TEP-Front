import styled from "styled-components";
import Modal from "@material-ui/core/Modal";

type StyledProps = {
    $first ?: boolean;
    $deactive ?: boolean;
}

export const Block = styled(Modal)`
    border-radius : 10px;
    display : block;
    position : relative;
    display :flex;
    justify-content : center;
    align-items : center;
    width : 100%;
    height : 100%;
`;

export const Inner = styled.div`
    width : 70%;
    height : 100%;
    overflow-y : auto;
    padding  : 25px 45px;
    background-color : white;
    display : flex;
    flex-direction : column;
    position : relative;
    min-width: 500px;
    max-height: 1000px;
    p{
        height : 20px;
    }
`;