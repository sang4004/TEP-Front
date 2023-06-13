/******************************************************************************
 * hooks :
    * useLocations 
 * components : 
    * 
 * 
 *  <header>
                <S.HeaderTab>
                    <S.HeaderTabButton>공문서 수발신</S.HeaderTabButton>
                    <S.HeaderTabButton>공문서 수발신</S.HeaderTabButton>
                </S.HeaderTab>
            </header>

 ******************************************************************************/
import * as S from "../styled/edmsProject.styled";
import { ProjectTablesComponent, EdmsProjectBase } from "../components";

const Edmsproject = (props : any)=> {

    return (
        <EdmsProjectBase>
            {/*Body*/}
            <S.ContentContainer style={{padding : "0 10px"}}>
                <ProjectTablesComponent/>
            </S.ContentContainer>
        </EdmsProjectBase>
    );
};

export default Edmsproject;