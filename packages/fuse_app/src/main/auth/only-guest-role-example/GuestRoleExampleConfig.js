import { authRoles } from '../../../auth';
import GuestRoleExample from './GuestRoleExample';

const GuestRoleExampleConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.onlyGuest, // ['guest']
	routes: [
		{
			path: '/auth/guest-role-example',
			component: GuestRoleExample
		}
	]
};

export default GuestRoleExampleConfig;
