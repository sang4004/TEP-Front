import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectFooterTheme } from '../../../store/fuse/settingsSlice';

function FooterLayout1(props) {
	const footerTheme = useSelector(selectFooterTheme);
	const isVisible = props.isVisible && props.isVisible[0];
	return (
		<ThemeProvider theme={footerTheme}>
			<AppBar
				id="fuse-footer"
				className="relative z-10 shadow-md"
				color="default"
				hidden={!isVisible}
				style={{ backgroundColor: footerTheme.palette.background.paper, display : isVisible ? "flex" : "none" }}
				
				>
				<Toolbar className="min-h-48 md:min-h-64 px-8 sm:px-12 py-0 flex items-center overflow-x-auto">
					<Typography>Footer</Typography>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default React.memo(FooterLayout1);
