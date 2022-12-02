import { authRoles } from '@fuse_app/auth';
import store from '@fuse_app/store';
import { logoutUser } from '@fuse_app/auth/store/userSlice';

const LogoutConfig = {
	auth: authRoles.user,
	routes: [
		{
			path: '/logout',
			component: () => {
				store.dispatch(logoutUser());
				return 'Logging out..';
			}
		}
	]
};

export default LogoutConfig;
