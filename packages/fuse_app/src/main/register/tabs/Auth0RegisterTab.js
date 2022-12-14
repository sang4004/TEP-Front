import Button from '@material-ui/core/Button';
import auth0Service from '../../../services/auth0Service';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserDataAuth0 } from '../../../auth/store/userSlice';
import { showMessage } from '../../../store/fuse/messageSlice';

function Auth0RegisterTab(props) {
	const dispatch = useDispatch();

	useEffect(() => {
		showDialog();

		auth0Service.onAuthenticated(() => {
			dispatch(showMessage({ message: 'Logging in with Auth0' }));

			auth0Service.getUserData().then(tokenData => {
				dispatch(setUserDataAuth0(tokenData));

				dispatch(showMessage({ message: 'Logged in with Auth0' }));
			});
		});
	}, [dispatch]);

	function showDialog() {
		auth0Service.register();
	}

	return (
		<div className="w-full">
			<Button className="w-full my-48" color="primary" variant="contained" onClick={showDialog}>
				Log In/Sign Up with Auth0
			</Button>
		</div>
	);
}

export default Auth0RegisterTab;
