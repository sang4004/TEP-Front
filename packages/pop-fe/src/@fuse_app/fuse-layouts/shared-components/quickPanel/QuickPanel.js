import FuseScrollbars from '@fuse/core/FuseScrollbars';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from '@fuse_app/store/withReducer';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleQuickPanel } from './store/stateSlice';
import reducer from './store';

const useStyles = makeStyles(theme => ({
	root: {
		width: 280
	}
}));

function QuickPanel(props) {
	const dispatch = useDispatch();
	// const state = useSelector((state) => {
	// 	console.log(state)
	// 	return quickPanel.state
	// });

	const classes = useStyles();

	return (
		<SwipeableDrawer
			classes={{ paper: classes.root }}
			//TODO :: open parameter needs
			open={false}
			anchor="right"
			onOpen={ev => {}}
			onClose={ev => dispatch(toggleQuickPanel())}
			disableSwipeToOpen
		>
			<FuseScrollbars>
				<Typography>Quick Panel</Typography>
			</FuseScrollbars>
		</SwipeableDrawer>
	);
}

export default withReducer('quickPanel', reducer)(React.memo(QuickPanel));
