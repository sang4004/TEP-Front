import FuseScrollbars from 'fuse/lib/core/FuseScrollbars';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Logo from '../../../fuse-layouts/shared-components/Logo';
import NavbarFoldedToggleButton from '../../../fuse-layouts/shared-components/NavbarFoldedToggleButton';
import NavbarMobileToggleButton from '../../../fuse-layouts/shared-components/NavbarMobileToggleButton';
import Navigation from '../../../fuse-layouts/shared-components/Navigation';
import UserNavbarHeader from '../../../fuse-layouts/shared-components/UserNavbarHeader';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles(theme => ({
	root: {
		'& ::-webkit-scrollbar-thumb': {
			boxShadow: `inset 0 0 0 20px ${
				theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.24)' : 'rgba(255, 255, 255, 0.24)'
			}`
		},
		'& ::-webkit-scrollbar-thumb:active': {
			boxShadow: `inset 0 0 0 20px ${
				theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.37)' : 'rgba(255, 255, 255, 0.37)'
			}`
		}
	},
	content: {
		overflowX: 'hidden',
		overflowY: 'auto',
		'-webkit-overflow-scrolling': 'touch',
		background:
			'linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)',
		backgroundRepeat: 'no-repeat',
		backgroundSize: '100% 40px, 100% 10px',
		backgroundAttachment: 'local, scroll'
	}
}));

function NavbarLayout1(props) {
	const classes = useStyles();
	const theme = useTheme();
	return (
		<div className={clsx('flex flex-col overflow-hidden h-full', classes.root, props.className)}>
			{props.navTopInfo && props.navTopInfo[0].logo_only ? 
				<AppBar
					color="primary"
					position="static"
					className={"flex flex-row items-center flex-shrink h-48 md:h-64 min-h-48 md:min-h-64 px-12 shadow-0 " + props.navBarClassName}
					style={props.appBarStyle ? props.appBarStyle[0] : null}
					>
					<img 
						className="logo-icon" 
						src={"assets/images/1x1_logo.png"} 
						alt="logo"
						style={{width : "auto", height : "100%"}}
						/>
				</AppBar>
				:
				<AppBar
					color="primary"
					position="static"
					className={"flex flex-row items-center flex-shrink h-48 md:h-64 min-h-48 md:min-h-64 px-12 shadow-0 " + props.navBarClassName}
					style={props.appBarStyle ? props.appBarStyle[0] : null}
					>
					
					<div className="flex flex-1 mx-8">
						<Logo />
					</div>

					<Hidden mdDown>
						<NavbarFoldedToggleButton className="w-40 h-40 p-0" />
					</Hidden>

					<Hidden lgUp>
						<NavbarMobileToggleButton className="w-40 h-40 p-0">
							<Icon>{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}"</Icon>
						</NavbarMobileToggleButton>
					</Hidden>
				</AppBar>
			}

			<FuseScrollbars className={clsx(classes.content)} option={{ suppressScrollX: true }}>
				{(props.userNavBar && props.userNavBar[0])  && <UserNavbarHeader {...props} /> }
				<Navigation 
					layout="vertical"
					{...props}
					/>
			</FuseScrollbars>
		</div>
	);
}

export default React.memo(NavbarLayout1);
