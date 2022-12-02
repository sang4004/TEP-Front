import FuseAnimate from "fuse/lib/core/FuseAnimate";
import { useForm } from "fuse/lib/hooks";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignUp, CheckExistId } from "../common/action";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ModalInfo, LoadingIndicatorComponent } from "components";

function RegisterPage() {
    const dispatch = useDispatch();
    const userSelector = useSelector(state => state.user);
    const [type, setType] = useState("document");
    const [title, setTitle] = useState("문서수발신시스템");

    const [orgList, setOrgList] = useState([]);
    const [positionList, setPositionList] = useState([]);

    const [groupId, setGroupId] = useState(-1);
    const [companyId, setCompanyId] = useState(-1);
    const [positionId, setPositionId] = useState(-1);

    const [isLoading, setIsLoading] = useState(false);
    const [edmsCheck, setEdmsCheck] = useState(false);
    const [documentCheck, setDocumentCheck] = useState(true);

    const { form, handleChange, resetForm } = useForm({
        id: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        passwordConfirm: "",
        acceptTermsConditions: false,
    });

    useEffect(() => {
        dispatch(CheckExistId(form.id, type));
    }, [form.id]);

    useEffect(() => {
        if (type === "document" && userSelector.org_list) {
            setOrgList(userSelector.org_list);
        } else if (type === "edms" && userSelector.edms_org_list) {
            let _list = [];
            let edms_org_list = userSelector.edms_org_list;

            for (let list of edms_org_list) {
                list.group.map(raw => {
                    _list.push({
                        company_id: raw.company_id,
                        company: list.company.company_name,
                        id: raw.id,
                        name: raw.group_name,
                    });
                });
            }
            setOrgList(_list);
        }
    }, [type, userSelector.org_list, userSelector.edms_org_list]);

    useEffect(() => {
        if (groupId != -1) {
            if (type === "document" && userSelector.position_list) {
                setPositionId(-1);
                setPositionList(userSelector.position_list);
            } else if (type === "edms" && orgList.length != 0) {
                let _list = [];
                let data = orgList.find(raw => raw.id == groupId);

                for (let list of userSelector.edms_org_list) {
                    if (list.company.id == data.company_id) {
                        list.position.map(raw => {
                            _list.push({
                                id: raw.id,
                                name: raw.position_name,
                            });
                        });
                    }
                }

                setPositionId(-1);
                setPositionList(_list);
            }
        }
    }, [groupId]);

    function isFormValid() {
        return (
            form.id.length > 0 &&
            form.username.length > 0 &&
            form.password.length > 0 &&
            form.password.length > 3 &&
            form.password === form.passwordConfirm &&
            groupId != -1
        );
    }

    async function handleSubmit(ev) {
        ev.preventDefault();
        if (!userSelector.signup_exist_id) {
            ModalInfo("이미 존재하는 아이디입니다. 다른 아이디를 입력해주세요.");
            return;
        }
        await dispatch(
            SignUp(
                form.id,
                form.username,
                form.password,
                form.email,
                groupId,
                form.phone,
                positionId,
                companyId,
                type
            )
        );
        resetForm();
        setGroupId(-1);
        setCompanyId(-1);
        setPositionId(-1);
    }

    const onClickCheck = type => {
        setIsLoading(true);

        if (type == "document") {
            setType("document");
            setTitle("문서수발신시스템");

            setEdmsCheck(false);
            setDocumentCheck(true);
        } else {
            setType("edms");
            setTitle("EDMS");

            setEdmsCheck(true);
            setDocumentCheck(false);
        }
        resetForm();
        setGroupId(-1);
        setCompanyId(-1);
        setPositionId(-1);

        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    const onChangeGroup = e => {
        if (type === "document") {
            setGroupId(e.target.value);
        } else {
            let data = orgList.find(raw => raw.id == e.target.value);
            setGroupId(e.target.value);
            setCompanyId(data.company_id);
        }
    };

    return (
        <div
            className="flex flex-col items-center justify-center w-full"
            style={{ width: "100%", height: "auto" }}
        >
            <LoadingIndicatorComponent open={isLoading} style={{ zIndex: 1300 }} />
            <FuseAnimate animation="transition.expandIn">
                <Card className="w-full max-w-384 rounded-8">
                    <CardContent className="flex flex-col items-center justify-center p-32">
                        <Title> {title} 회원가입 </Title>
                        <form
                            name="registerForm"
                            noValidate
                            className="flex flex-col justify-center w-full"
                            onSubmit={handleSubmit}
                        >
                            {/* <ApproveBlock>
                                <CheckboxBlockIn
                                    checked={documentCheck}
                                    onChange={e => onClickCheck("document")}
                                />
                                <TabTitle onClick={e => onClickCheck("document")}>
                                    문서수발신시스템
                                </TabTitle>
                                <CheckboxBlockIn
                                    checked={edmsCheck}
                                    onChange={e => onClickCheck("edms")}
                                />
                                <TabTitle onClick={e => onClickCheck("edms")}>EDMS</TabTitle>
                            </ApproveBlock> */}
                            <TextField
                                className="mb-16"
                                label="ID"
                                autoFocus
                                type="id"
                                name="id"
                                value={form.id}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                style={{ marginBottom: "4px", marginLeft: "15%", width: "70%" }}
                            />
                            <DuplicateText $duplicated={!userSelector.signup_exist_id}>
                                {form.id.length == 0
                                    ? "아이디를 입력해주세요."
                                    : userSelector.signup_exist_id
                                    ? "사용 가능한 아이디입니다."
                                    : "이미 존재하는 아이디입니다."}
                            </DuplicateText>
                            <TextField
                                className="mb-16"
                                label="USER NAME"
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                style={{ marginLeft: "15%", width: "70%" }}
                            />
                            <TextField
                                className="mb-16"
                                label="Email"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                style={{ marginLeft: "15%", width: "70%" }}
                            />

                            <TextField
                                className="mb-16"
                                label="Phone Number"
                                type="phone"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                style={{ marginLeft: "15%", width: "70%" }}
                            />

                            <TextField
                                className="mb-16"
                                label="Password"
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                style={{ marginLeft: "15%", width: "70%" }}
                            />
                            <DuplicateText $duplicated={true}>
                                {form.password.length == 0
                                    ? "비밀번호를 입력해주세요."
                                    : form.password.length > 3
                                    ? ""
                                    : "3자리 이상 입력해주세요."}
                            </DuplicateText>

                            <TextField
                                className="mb-16"
                                label="Password (Confirm)"
                                type="password"
                                name="passwordConfirm"
                                value={form.passwordConfirm}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                style={{ marginLeft: "15%", width: "70%" }}
                            />
                            <DuplicateText $duplicated={true}>
                                {form.passwordConfirm.length == 0
                                    ? "동일한 비밀번호를 입력해주세요."
                                    : form.password === form.passwordConfirm
                                    ? ""
                                    : "일치하지 않습니다."}
                            </DuplicateText>

                            <InputLabel
                                id="org-input-label"
                                style={{ marginLeft: "15%", width: "70%" }}
                            >
                                부서를 선택해주세요.
                            </InputLabel>
                            <GroupDropbox
                                onChange={e => onChangeGroup(e)}
                                disableUnderline
                                $selected={groupId != -1}
                                labelId="org-input-label"
                                value={groupId}
                                style={{ marginLeft: "15%", width: "70%" }}
                            >
                                <MenuItem value={-1} selected>
                                    <em>부서를 선택해주세요.</em>
                                </MenuItem>
                                <MenuItem value={0}>
                                    <em>None</em>
                                </MenuItem>
                                {orgList &&
                                    orgList.length > 0 &&
                                    orgList.map((raw, idx) => {
                                        return (
                                            <MenuItem value={raw.id} key={idx}>
                                                {raw.company}/{raw.name}
                                            </MenuItem>
                                        );
                                    })}
                            </GroupDropbox>
                            <InputLabel
                                id="position-input-label"
                                style={{ marginLeft: "15%", width: "70" }}
                            >
                                직급을 선택해주세요.
                            </InputLabel>
                            <GroupDropbox
                                onChange={e => setPositionId(e.target.value)}
                                disableUnderline
                                $selected={positionId != -1}
                                labelId="position-input-label"
                                value={positionId}
                                style={{ marginLeft: "15%", width: "70%" }}
                            >
                                <MenuItem value={-1} selected>
                                    <em>직급을 선택해주새요.</em>
                                </MenuItem>
                                <MenuItem value={0}>
                                    <em>None</em>
                                </MenuItem>
                                {positionList &&
                                    positionList.length > 0 &&
                                    positionList.map((raw, idx) => {
                                        return (
                                            <MenuItem value={raw.id} key={idx}>
                                                {raw.name}
                                            </MenuItem>
                                        );
                                    })}
                            </GroupDropbox>
                            <Button
                                variant="contained"
                                color="primary"
                                className="w-224 mx-auto mt-16"
                                aria-label="Register"
                                disabled={!isFormValid()}
                                type="submit"
                            >
                                Create an account
                            </Button>
                        </form>

                        <div
                            className="flex flex-col items-center justify-center pt-32 pb-24 w-full"
                            style={{ marginTop: "10px" }}
                        >
                            <span className="font-medium">Already have an account?</span>
                            <Link className="font-medium" to="/login">
                                Login
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </FuseAnimate>
        </div>
    );
}

const Title = styled.div`
    font-size: 24px;
    margin-bottom: 16px;
`;

const TabTitle = styled.div`
    &:hover {
        cursor: pointer;
    }
`;

const GroupDropbox = styled(Select)`
    border: 1px solid #c4c4c4;
    border-radius: 4px;
    color: ${props => (props.$selected ? "black" : "rgba(0,0,0,0.54)")};
    padding: 10px;
    margin: 10px 0;
`;

const DuplicateText = styled(Typography)`
    color: ${props => (props.$duplicated ? "#ED6161" : "#477EE9")};
    margin-left: 15%;
    margin-bottom: 14px;
`;

const ApproveBlock = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-bottom: 1%;
`;

const CheckboxBlockIn = styled(Checkbox)``;

export default RegisterPage;
