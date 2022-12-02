import FuseNavigation from '@fuse/core/FuseNavigation';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectNavigation } from '@fuse_app/store/fuse/navigationSlice';
import { GridNavigationComponent } from "components";

function Navigation(props) {
	const navigation = useSelector(selectNavigation);
	// if(props.navType == "grid"){
		return (
			<GridNavigationComponent 
				className={clsx('navigation', props.className)}
				navigation={navigation}
				active={props.active}
				/>
		)
	// }
	return (
		<FuseNavigation
			className={clsx('navigation', props.className)}
			navigation={navigation}
			layout={props.layout}
			dense={props.dense}
			active={props.active}
		/>
	);
}

Navigation.defaultProps = {
	layout: 'vertical'
};

export default React.memo(Navigation);