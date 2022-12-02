import FuseUtils from '@fuse/utils';
import appsConfigs from '@fuse_app/main/apps/appsConfigs';
import authRoleExamplesConfigs from '@fuse_app/main/auth/authRoleExamplesConfigs';
import CallbackConfig from '@fuse_app/main/callback/CallbackConfig';
import LoginConfig from '@fuse_app/main/login/LoginConfig';
import LogoutConfig from '@fuse_app/main/logout/LogoutConfig';
import pagesConfigs from '@fuse_app/main/pages/pagesConfigs';
import RegisterConfig from '@fuse_app/main/register/RegisterConfig';
import UserInterfaceConfig from '@fuse_app/main/user-interface/UserInterfaceConfig';
import React from 'react';
import { Redirect } from 'react-router-dom';

const routeConfigs = [
	...appsConfigs,
	...pagesConfigs,
	...authRoleExamplesConfigs,
	UserInterfaceConfig,
	LogoutConfig,
	LoginConfig,
	RegisterConfig,
	LogoutConfig,
	CallbackConfig
];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
	{
		path: '/',
		exact: true,
		component: () => <Redirect to="/apps/dashboards/analytics" />
	},
	{
		component: () => <Redirect to="/pages/errors/error-404" />
	}
];

export default routes;
