import { authRoles } from '../../auth';
import store from '../../store';
import { logoutUser } from '../../auth/store/userSlice';

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
