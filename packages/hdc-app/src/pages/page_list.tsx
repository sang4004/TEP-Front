/******************************************************************************
 * hooks :
 * useLocations
 * components :
 *
 * TO DO :  constants 네비게이션을 loop 하여 자동 route 생성 기능 추가
 ******************************************************************************/
//Library
import React, { useState, useEffect, Suspense, lazy } from "react";
import { useHistory, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { reducerState } from "../common";
//

const LoginPage = lazy(() => import("./login.page"));
const UserInfoPage = lazy(() => import("./userinfo.page"));
const RegistPage = lazy(() => import("./regist.page"));
const MainPage = lazy(() => import("./main.page"));
const SignWaitList = lazy(() => import("./signwaitlist.page"));
const SignRejectList = lazy(() => import("./signrejectlist.page"));
const SignCompleteList = lazy(() => import("./signcompletelist.page"));
const DocumentNewPage = lazy(() => import("./documentnew.page"));
const DocumentViewPage = lazy(() => import("./documentview.page"));
const DocumentPreviewPage = lazy(() => import("./documentpreview.page"));
const DocumentEditPage = lazy(() => import("./documentedit.page"));
const DocumentSendPage = lazy(() => import("./documentsend.page"));
const DocumentRecvPage = lazy(() => import("./documentrecv.page"));
const DocumentRegistPage = lazy(() => import("./documentregist.page"));
const DocumentBoxPage = lazy(() => import("./documentbox.page"));
const AbpartListPage = lazy(() => import("./abpartlist.page"));
// 가존문서
const DocumentOffSendPage = lazy(() => import("./documentoffsend.page"));
const DocumentOffViewPage = lazy(() => import("./documentoffview.page"));
const DocumentOffEditPage = lazy(() => import("./documentoffedit.page"));
// 일반문서
const WriteNormal = lazy(() => import("./writenormal.page"));
const ViewNormal = lazy(() => import("./viewnormal.page"));
const NormalList = lazy(() => import("./normallist.page"));
//edms
const MainPageNew = lazy(() => import("./mainNew.page"));
const ProjectPage = lazy(() => import("./project.page"));
// const Edmsproject = lazy(() => import("./edmsproject.page"));
const EdmsCategory = lazy(() => import("./edmsCategory.page"));
const EdmsProjectDrn = lazy(() => import("./edmsProjectDrn.page"));
const EdmsDocumentListPage = lazy(() => import("./edmsdocumentlist.page"));
const EdmsDocumentInfoPage = lazy(() => import("./edmsDocumentInfo.page"));
const EdmsTmpDocumentListPage = lazy(() => import("./edmsTmpDocumentlist.page"));
const EdmsWorkProcPage = lazy(() => import("./edmsWorkProc.page"));
const EdmsDinDetailPage = lazy(() => import("./edmsDindetail.page"));
const EdmsDrnDetailPage = lazy(() => import("./edmsDrndetail.page"));
const EdmsTmDetailPage = lazy(() => import("./edmsTmdetail.page"));
const EdmsAchiveListPage = lazy(() => import("./edmsAchivelist.page"));
const EdmsReviewListPage = lazy(() => import("./edmsReviewlist.page"));
const EdmsDocumentActListPage = lazy(() => import("./edmsDocumentActlist.page"));
const EdmsDocumentActListDetailPage = lazy(() => import("./edmsDocumentActlistDetail.page"));
const EdmsModelManagePage = lazy(() => import("./edmsModelManage.page"));
const PdfViewerPage = lazy(() => import("./pdfviewer.page"));
const UserMainPage = lazy(() => import("./userMain.page"));
const EdmsDclListPage = lazy(() => import("./edmsDcllist.page"));
const EdmsDocumentManagerPage = lazy(() => import("./edmsDocumentManager.page"));
const EdmsVpListPage = lazy(() => import("./edmsVPlist.page"));
const EdmsDeleteBoxPage = lazy(() => import("./edmsDeleteBox.page"));
const EdmsAdminDeleteBoxPage = lazy(() => import("./edmsAdminDeleteBox.page"));
const EdmsCommentViewPage = lazy(() => import("./edmsCommentView.page"));
const MailUserPage = lazy(() => import("./mailUser.page"));
const EdmsLogPage = lazy(() => import("./edmsLog.page"));
const EdmsDisciplinePage = lazy(() => import("./edmsDiscipline.page"));
const EdmsOtherDocument = lazy(() => import("./edmsOtherDocument.page"));
const EdmsPlantLog = lazy(() => import("./edmsPlantLog.page"));
export const PageList = () => {
    const userSelector = useSelector((state: reducerState) => state.user);
    return (
        <Suspense fallback={<div>로딩중...</div>}>
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/regist" component={RegistPage} />
                <Route exact path="/dshome" component={MainPage} />
                {/* 유저 정보 편집 */}
                <Route exact path="/userinfo/:user_id" component={UserInfoPage} />
                {/* 일반문서 */}
                <Route exact path="/document/normal/write" component={WriteNormal} />
                <Route exact path="/document/normal/edit/:id" component={WriteNormal} />
                <Route exact path="/document/normal/view/:id" component={ViewNormal} />
                <Route exact path="/document/normal/reject/:id" component={ViewNormal} />
                <Route exact path="/document/normal/complete/:id" component={ViewNormal} />
                <Route exact path="/document/normalList/:type" component={NormalList} />
                {/* 결재 문서 뷰 페이지 */}
                <Route exact path="/document/new" component={DocumentNewPage} />
                <Route exact path="/document/view/:id" component={DocumentViewPage} />
                <Route exact path="/document/offview/:id" component={DocumentOffViewPage} />
                <Route exact path="/document/preview/:id" component={DocumentPreviewPage} />
                <Route exact path="/document/edit/:id" component={DocumentEditPage} />
                <Route exact path="/document/offedit/:id" component={DocumentOffEditPage} />
                <Route exact path="/document/complete/:id" component={DocumentSendPage} />
                <Route exact path="/document/offcomplete/:id" component={DocumentOffSendPage} />
                <Route exact path="/document/reject/:id" component={DocumentViewPage} />
                <Route exact path="/document/send/:id" component={DocumentSendPage} />
                <Route exact path="/document/offsend/:id" component={DocumentOffSendPage} />
                <Route exact path="/document/recv/:id" component={DocumentRecvPage} />
                <Route exact path="/document/offrecv/:id" component={DocumentOffSendPage} />
                <Route exact path="/document/regist/:id" component={DocumentRegistPage} />
                {/* 결재하기 카테고리  */}
                <Route exact path="/dsrequest" component={SignWaitList} />
                <Route exact path="/dsreject" component={SignRejectList} />
                <Route exact path="/dscomplete" component={SignCompleteList} />
                {/* 문서함 카테고리 */}
                <Route exact path="/fbtemporary" component={DocumentBoxPage} />
                <Route exact path="/fbsent/:type" component={DocumentBoxPage} />
                <Route exact path="/fbrecieved/:type" component={DocumentBoxPage} />
                <Route exact path="/fbregist" component={DocumentBoxPage} />
                {/* 주소록 */}
                <Route exact path="/abpart" component={AbpartListPage} />
                <Route exact path="/abpartedit/:user_id" component={UserInfoPage} />
                {/*EDMS New*/}
                <Route exact path="/edms/home" component={UserMainPage} />
                <Route exact path="/edms/pjtrend" component={MainPageNew} />
                <Route exact path="/edms/project" component={ProjectPage} />
                {/* <Route exact path="/edms/projectinfo" component={Edmsproject} /> */}
                <Route exact path="/edms/edmsDrn" component={EdmsProjectDrn} />
                <Route exact path="/edms/category" component={EdmsCategory} />
                <Route exact path="/edms/document" component={EdmsDocumentListPage} />
                <Route exact path="/edms/document/info/:id" component={EdmsDocumentInfoPage} />
                <Route exact path="/edms/tmpDocList" component={EdmsTmpDocumentListPage} />
                <Route exact path="/edms/workproc/:type/:project_no" component={EdmsWorkProcPage} />
                <Route
                    exact
                    path="/edms/workproc/:type/:work_type/:wp_idx"
                    component={EdmsWorkProcPage}
                />
                <Route exact path="/edms/workproc/:type/:work_type" component={EdmsWorkProcPage} />
                <Route path="/edms/workproc/:type" component={EdmsWorkProcPage} />
                <Route exact path="/edms/din/detail/:wp_idx" component={EdmsDinDetailPage} />
                {/* <Route exact path="/edms/drn" component={EdmsDrnListPage} /> */}
                <Route exact path="/edms/drn/detail/:wp_idx" component={EdmsDrnDetailPage} />
                {/* <Route exact path="/edms/tm" component={EdmsTmListPage} /> */}
                <Route exact path="/edms/tm/detail/:wp_idx" component={EdmsTmDetailPage} />
                <Route exact path="/edms/achive" component={EdmsAchiveListPage} />
                <Route exact path="/edms/finaldcl" component={EdmsAchiveListPage} />
                <Route exact path="/edms/reviewlist" component={EdmsReviewListPage} />
                <Route exact path="/edms/modelmanage" component={EdmsModelManagePage} />
                {/* <Route exact path="/edms/reviewlist" component={EdmsAchiveListPage} /> */}
                <Route exact path="/edms/docuact" component={EdmsDocumentActListPage} />
                <Route exact path="/edms/pdfviewer" component={PdfViewerPage} />
                <Route exact path="/edms/pdfviewer/:file_no" component={PdfViewerPage} />
                <Route
                    exact
                    path="/edms/docuact/detail/:cate_no/:docu_no"
                    component={EdmsDocumentActListDetailPage}
                />
                <Route exact path="/edms/dcl/:pno" component={EdmsDclListPage} />
                <Route exact path="/edms/vp/:pno" component={EdmsVpListPage} />
                <Route exact path="/edms/plantlog/:pno" component={EdmsPlantLog} />
                <Route exact path="/edms/documanager" component={EdmsDocumentManagerPage} />
                <Route exact path="/edms/deletebox" component={EdmsDeleteBoxPage} />
                <Route exact path="/edms/admindeletebox" component={EdmsAdminDeleteBoxPage} />
                <Route
                    exact
                    path="/edms/tm/commentview/:wp_idx/:comment_type"
                    component={EdmsCommentViewPage}
                />
                <Route path="/edms/tm/commentview/:wp_idx" component={EdmsCommentViewPage} />
                <Route path="/edms/mail" component={MailUserPage} />
                <Route path="/edms/log" component={EdmsLogPage} />
                <Route path="/edms/discipline" component={EdmsDisciplinePage} />
                <Route path="/edms/otherdocument" component={EdmsOtherDocument} />
            </Switch>
        </Suspense>
    );
};
