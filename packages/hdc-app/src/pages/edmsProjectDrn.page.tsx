/******************************************************************************
 * hooks :
    * useLocations 
 * components : 
    * 
 * 

 ******************************************************************************/
import * as S from "../styled/edmsDetail.styled";
import projectGauge from "../images/fontawsomeicon/project_gauge.png";
import { EdmsProjectDrnCompoComponent  } from "../components";

const EdmsProjectDrn = (props : any)=> {
    return (
        <S.Block className="main-page__container">
            {/*Head*/}
                <S.ContentsWrapHeaderDrn>
                    <S.ProjectTitle>
                        <small>Project</small>
                        <S.ProjectSelect>
                            <option >통영에코파워 발전기</option>
                        </S.ProjectSelect>
                    </S.ProjectTitle>

                    <S.ProjectStatWrap>
                        <S.ProjectStatGauge>
                            <img src={projectGauge} />
                            <S.ProjectStat>Good</S.ProjectStat>
                        </S.ProjectStatGauge>
                        
                        <S.ProjectStatPer>
                            12.3%
                        </S.ProjectStatPer>
                    </S.ProjectStatWrap>
                </S.ContentsWrapHeaderDrn>

                <EdmsProjectDrnCompoComponent/>

        </S.Block>
    );
};

export default EdmsProjectDrn;