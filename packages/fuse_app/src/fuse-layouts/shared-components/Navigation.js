import FuseNavigation from 'fuse/lib/core/FuseNavigation';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectNavigation } from '../../store/fuse/navigationSlice';
import { GridNavigationComponent } from "components";

function Navigation(props) {
	const navigation = useSelector(selectNavigation);
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