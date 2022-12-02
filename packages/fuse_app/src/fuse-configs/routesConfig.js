import FuseUtils from 'fuse/lib/utils';
import appsConfigs from '../main/apps/appsConfigs';
import authRoleExamplesConfigs from '../main/auth/authRoleExamplesConfigs';
import CallbackConfig from '../main/callback/CallbackConfig';
import LoginConfig from '../main/login/LoginConfig';
import LogoutConfig from '../main/logout/LogoutConfig';
import pagesConfigs from '../main/pages/pagesConfigs';
import RegisterConfig from '../main/register/RegisterConfig';
import UserInterfaceConfig from '../main/user-interface/UserInterfaceConfig';
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
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, null)
	// ,
	// {
	// 	path: '/',
	// 	exact: true,
	// 	component: () => <Redirect to="/apps/dashboards/analytics" />
	// },
	// {
	// 	component: () => <Redirect to="/pages/errors/error-404" />
	// }
];

export default routes;
