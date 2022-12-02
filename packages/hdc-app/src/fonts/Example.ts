import { createGlobalStyle } from "styled-components";
//font import

//
export const ExampleFont = createGlobalStyle`
    @font-face {
        font-family: "Mont Heavy Demo";
        src: local("Mont Heavy Demo"),
        url(${"font add here"}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
`;