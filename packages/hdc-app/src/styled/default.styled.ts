import styled, {createGlobalStyle} from "styled-components";

type StyledProps = {
    $isMain : boolean;
}

export const Block = styled.div`
    width : 100%;
    height : 100%;
    display: flex;
    justify-content: flex-start;
    align-items : flex-start;
    overflow-y : auto;
    gap : 1em;
    padding : 10px 10px;
`;

export const Bg = styled.div`
    position: relative;
    box-sizing: border-box;
    border-radius: 10px;
    background: white;
    color: #4b5964;
    box-shadow: 0 0 5px 1px rgb(136 136 136 / 30%);
    width: ${(props : StyledProps)=> props.$isMain ? "75%" : "25%"};
    min-height: 80vh;
    height : auto;
    display : flex;
    justify-content : flex-start;
    align-items : center;
    flex-direction : column;
`;

export const theme_background_big = `
    background-color : #3E4854;
`;

export const theme_background_small = `
    background-color: #404B57;
`;

export const theme_background_sub_button = `
    background-color: #3CA2DD;
`;

export const theme_background_main_button = `
    background-color:  #FCC344;
`;

export const theme_background_card = `
    background-color : #FFFFFF;
`;

export const theme_background_chip = `
    background-color: #E9E8E9;
`;

export const theme_background_badge = `
    background-color: #525E8A;
`;

export const theme_color_chip = `
    color: #4D525D;
`;

export const theme_color_sub_button_text = `
    color: #FFFFFF;
`;

export const theme_color_main_button_text = `
    color: #1E1F23;
`;

export const theme_color_main_title = `
    color : #111827;
`;

export const theme_color_sub_title = `
    color : #707FA5;
`;

export const theme_color_din_text = `
    color : #6B7D32;
`;

export const theme_color_din_number = `
    color : #4CAF50;
`;

export const theme_color_drn_text = `
    color : #CA2828;
`;

export const theme_color_drn_number = `
    color : #F44336;
`;

export const theme_color_tm_text = `
    color : #F26C00;
`;

export const theme_color_tm_number = `
    color : #FF9800;
`;

export const theme_color_doc_text = `
    color : #2B65C0;
`;

export const theme_color_doc_number = `
    color : #2196F3;
`;

export const theme_background_main_button_hover = `
    background-color : #FAA11F;
`;

export const theme_background_sub_button_hover = `
    background-color : #3c87dd;
`;