import styled from "styled-components";

type StyledProps = {
    $first ?: boolean;
}

export const Block = styled.div`
    display : flex;
    flex-direction : row;
`;

export const TabMenu = styled.ul`
    display: flex;
    float: left;
    padding: 10px;
    padding-left: 20px;
    height : 100%;
    flex : 1;
    overflow-x: auto;
    li{
        display: flex;
        align-items: center;
        button {
            display: flex;
            align-items: center;
            margin-right: 15px;
            width: max-content;
            img {
                display: block;
                width: 16px;
                margin-right: 5px;
                margin-top:-4px;
            }
        }
    }
`;

export const SignBtn = styled.li`
    color : #477EE9;
`;

export const TempBtn = styled.li`
    button{
        img {
            width : 12px !important;
        }
    }
`;

export const TabEtc = styled.ul`
    float: right;
    display: flex;
    align-items: center;
    padding: 10px;
    padding-right: 20px;
    height : 100%;
    li:nth-of-type(1) {
        margin-left: 20px;
        button {
            display: flex;
            align-items: center;
            flex-direction : row;
            img {
                display: block;
                width: 14px;
                margin-right: 5px;
                margin-top: -4px;
            }
        }
    }
`;