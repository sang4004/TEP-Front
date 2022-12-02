import { TextFieldFormsy } from 'fuse/lib/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getConstants } from "utils_ts/lib";
import { Login } from "common_module";
//
import styled from "styled-components";

function CustomLoginTab(props) {
	const dispatch = useDispatch();
	const login = useSelector((state) => state.user);

	const [isFormValid, setIsFormValid] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [onSelectUser, setOnSelectUser] = useState(true);
	const [selectedUser, setSelectedUser] = useState(-1);

	const formRef = useRef(null);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

    const onClickLogin = async(model)=>{
		if(selectedUser != -1 && onSelectUser){
			await dispatch(Login(login.user_list[selectedUser].username, model.password));
		} else {
			await dispatch(Login(model.email, model.password));
		}
    }

	const selectUser = (idx)=>{
		setSelectedUser(idx);
		setOnSelectUser(true);
	}

	if(login.user_ids && login.user_ids.length > 0 && onSelectUser){
		return (
			<CustomLoginTabDiv className="w-full">
				<Formsy
					onValidSubmit={onClickLogin}
					onValid={enableButton}
					onInvalid={disableButton}
					ref={formRef}
					className="flex flex-col justify-center w-full"
					>
					<CustomLoginTabUserGroup>
						{login.user_list.map((raw,idx)=>{
							return (
								<CustomLoginTabUserBtn $selected={selectedUser == idx} key={idx} onClick={()=>selectUser(idx)}>
									<CustomLoginTabUserImgDiv 
										style={{backgroundImage : `url(${raw.profile_img ? raw.profile_img : "assets/images/1x1_logo.png"})`}} 
										/>
								</CustomLoginTabUserBtn>
							);
						})}
					</CustomLoginTabUserGroup>
					<TextFieldFormsy
						className={`mb-16 ${selectedUser == -1 ? "hidden" : ""}`}
						type="password"
						name="password"
						label="Password"
						value={props.numberVal}
						validations={{
							minLength: getConstants("PW_MIN_LENGTH")
						}}
						validationErrors={{
							minLength: 'Min character length is ' +  getConstants("PW_MIN_LENGTH")
						}}
						InputProps={{
							className: 'pr-2',
							type: showPassword ? 'text' : 'password',
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={() => setShowPassword(!showPassword)}>
										<Icon className="text-20" color="action">
											{showPassword ? 'visibility' : 'visibility_off'}
										</Icon>
									</IconButton>
								</InputAdornment>
							)
						}}
						variant="outlined"
						required
					/>

					<Button
						id="login_submit"
						type="submit"
						variant="contained"
						color="primary"
						className="w-full mx-auto mt-16"
						aria-label="LOG IN"
						disabled={!isFormValid}
						value="legacy"
						style={{height : "50px"}}
						>
						로그인
					</Button>
					<Button style={{height : "50px"}} onClick={()=>setOnSelectUser(false)}>새로 로그인</Button>
					
				</Formsy>
			</CustomLoginTabDiv>
		)
	}

	return (
		<CustomLoginTabDiv className="w-full">
			<Formsy
				onValidSubmit={onClickLogin}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col justify-center w-full"
			    >
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="email"
					label="Username/Email"
					value=""
					validations={{
						minLength: getConstants("ID_MIN_LENGTH")
					}}
					validationErrors={{
						minLength: 'Min character length is ' + getConstants("ID_MIN_LENGTH")
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									email
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="password"
					name="password"
					label="Password"
					value=""
					validations={{
						minLength: getConstants("PW_MIN_LENGTH")
					}}
					validationErrors={{
						minLength: 'Min character length is ' +  getConstants("PW_MIN_LENGTH")
					}}
					InputProps={{
						className: 'pr-2',
						type: showPassword ? 'text' : 'password',
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={() => setShowPassword(!showPassword)}>
									<Icon className="text-20" color="action">
										{showPassword ? 'visibility' : 'visibility_off'}
									</Icon>
								</IconButton>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16"
					aria-label="LOG IN"
					disabled={!isFormValid}
					value="legacy"
				    >
					Login
				</Button>
			</Formsy>
		</CustomLoginTabDiv>
	);
}

const CustomLoginTabDiv = styled.div`
`;

const CustomLoginTabUserGroup = styled.div`
	width : 100%;
	height : 200px;
	display : flex;
	justify-content : flex-start;
	align-items : center;
	flex-direction : row;
	overflow-x : auto;
	gap : 1em;
`;

const CustomLoginTabUserBtn = styled(Button)`
	flex : none;
	width : 120px;
	height : 120px;
	display : flex;
	justify-content : center;
	align-items : center;
	background-color : ${(props)=>props.$selected ? "#dedede" : "transparent"};
`;

const CustomLoginTabUserImgDiv = styled.div`
	width : 100px;
	height : 100px;
	background-color : white;
	background-size : cover;
	background-position-x : center;
	background-position-y : center;
	border-radius : 50%;
`;

export default CustomLoginTab;
